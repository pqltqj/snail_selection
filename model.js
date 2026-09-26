/* Classroom model. No network or dependencies. See MODEL.md for assumptions. */
(function(root){
'use strict';
function rng(seed){let a=seed>>>0;return()=>{a+=0x6D2B79F5;let t=a;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296;};}
const counts=[1,4,10,20,10,4,1];
function stats(snails){const v=snails.map(s=>s.t);return{n:v.length,mean:v.length?v.reduce((a,b)=>a+b,0)/v.length:0,min:v.length?Math.min(...v):0,max:v.length?Math.max(...v):0};}
class Population{
 constructor(seed=12345,settings={}){this.seed=seed;this.random=rng(seed);this.settings={variable:true,heritable:true,selective:true,mutation:false,mode:'main',...settings};this.nextId=1;this.gen=1;this.score=0;this.eaten=0;this.mutations=[];this.births=[];this.history=[];this.snails=[];this.initialise();}
 make(t,parent=null,pair=null){return{id:this.nextId++,t,parent:parent?.id??null,parentT:parent?.t??null,pair,hits:0,x:.05+this.random()*.9,y:.08+this.random()*.82};}
 drawTrait(){let r=Math.floor(this.random()*50);for(let i=0;i<counts.length;i++){r-=counts[i];if(r<0)return this.settings.mode==='mutation'?Math.min(4,i+1):i+1;}return 4;}
 initialise(){counts.forEach((n,i)=>{for(let j=0;j<n;j++)this.snails.push(this.make(this.settings.variable?(this.settings.mode==='mutation'?Math.min(4,i+1):i+1):4));});this.record('starting population');}
 record(phase){this.history.push({generation:this.gen,phase,...stats(this.snails),settings:{...this.settings},distribution:this.snails.map(s=>s.t)});}
 kill(s){this.snails=this.snails.filter(x=>x.id!==s.id);this.eaten++;}
 claw(id){const s=this.snails.find(s=>s.id===id);if(!s)return false;this.score--;s.hits++;if(s.hits>=Math.ceil(s.t)){this.kill(s);this.score+=10;return true;}return false;}
 eat(n=1,selective=this.settings.selective){for(let i=0;i<n&&this.snails.length;i++){let s;if(selective){const weights=this.snails.map(s=>Math.exp(-.5*(s.t-1)));let r=this.random()*weights.reduce((a,b)=>a+b,0);let j=0;while(j<weights.length-1&&r>=weights[j])r-=weights[j++];s=this.snails[j];}else{s=this.snails[Math.floor(this.random()*this.snails.length)];}this.kill(s);}}
 reproduce(){if(!this.snails.length)return{error:'The population is extinct. Reset to begin a new trial.'};if(this.snails.length>200)return{error:'There are too many snails to double safely. Eat down to 25, or reset.'};this.record('survivors before reproduction');const parents=this.snails;this.snails=[];this.births=[];this.gen++;this.eaten=0;
 for(const parent of parents){for(let i=0;i<2;i++){let t=this.settings.heritable?parent.t:this.drawTrait();let delta=0,attempt=0;if(this.settings.mutation&&this.random()<.2){attempt=this.random()<.5?-1:1;const changed=Math.max(1,t+attempt);delta=changed-t;t=changed;}const child=this.make(t,parent,parent.id);child.x=Math.max(.04,Math.min(.96,parent.x+(i===0?-.026:.026)));child.y=parent.y;child.mutated=delta!==0;this.snails.push(child);const b={generation:this.gen,id:child.id,parent:parent.id,parentT:parent.t,offspringT:t,delta,attempt};this.births.push(b);if(attempt)this.mutations.push(b);}}
 this.record('offspring');return{ok:true};}
}
class Research{
 constructor(seed=321){this.random=rng(seed);this.nextId=1;this.day=0;this.tanks=Array.from({length:4},(_,i)=>({name:'Tank '+(i+1),snails:[],crab:'none'}));this.coasts={west:[],east:[]};this.events=[];this.records=[];for(const origin of ['west','east'])for(let i=0;i<60;i++){const g=(origin==='east'?5:3)+(this.random()-.5)*3;this.coasts[origin].push(this.make(origin,g,i<30?0:3));}this.record();}
 make(origin,g,age=0,parents=[],birthT=null){return{id:this.nextId++,origin,g,age,parents,t:g,atBirth:birthT??g,cueGain:0};}
 transfer(origin,tank,ids){const src=typeof origin==='number'?this.tanks[origin].snails:this.coasts[origin];const dst=this.tanks[tank].snails;if(src===dst)return;for(const id of ids){const index=src.findIndex(s=>s.id===id);if(index>=0&&dst.length<100)dst.push(src.splice(index,1)[0]);}this.record();}
 step(){this.day++;for(const tank of this.tanks){const cue=tank.crab!=='none';for(const s of tank.snails){if(s.age<3&&cue){s.cueGain+=.5;s.t=s.g+s.cueGain;}s.age++;}if(tank.crab==='active'&&tank.snails.length){const weights=tank.snails.map(s=>Math.exp(-.5*s.t));let r=this.random()*weights.reduce((a,b)=>a+b,0),j=0;while(j<weights.length-1&&r>=weights[j])r-=weights[j++];const dead=tank.snails.splice(j,1)[0];this.events.push({day:this.day,tank:tank.name,event:'predation',id:dead.id,t:dead.t});}const old=tank.snails.filter(s=>s.age>=15);for(const s of old)this.events.push({day:this.day,tank:tank.name,event:'old age',id:s.id,t:s.t});tank.snails=tank.snails.filter(s=>s.age<15);
 if(this.day%3===0){const adults=tank.snails.filter(s=>s.age>=3);for(let i=adults.length-1;i>0;i--){const j=Math.floor(this.random()*(i+1));[adults[i],adults[j]]=[adults[j],adults[i]];}for(let i=0;i+1<adults.length&&tank.snails.length<98;i+=2){const a=adults[i],b=adults[i+1];for(let k=0;k<2;k++){let g=(a.g+b.g)/2+(this.random()-.5)*.8;if(this.random()<.1)g+=this.random()<.5?-.5:.5;g=Math.max(1,g);tank.snails.push(this.make(a.origin===b.origin?a.origin:'mixed',g,0,[a.id,b.id]));}}}}
 this.record();}
 record(){this.tanks.forEach(t=>this.records.push({day:this.day,tank:t.name,crab:t.crab,...stats(t.snails),juveniles:t.snails.filter(s=>s.age<3).length}));}
}
const api={rng,stats,Population,Research};if(typeof module!=='undefined')module.exports=api;root.SnailModel=api;
})(typeof window==='undefined'?globalThis:window);
