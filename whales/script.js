'use strict';
// The investigation deliberately uses a simplified seven-species key.
const KEY = {
 1: [{text:'Baleen plates',next:2},{text:'Teeth',next:4}],
 2: [{text:'Dorsal fin present',next:3},{text:'No dorsal fin',result:6}],
 3: [{text:'Long pectoral fins',result:1},{text:'Short pectoral fins',result:5}],
 4: [{text:'No dorsal fin',next:5},{text:'Large dorsal fin',result:0}],
 5: [{text:'Small nose, without a long projecting tusk',next:6},{text:'Long projection from the nose region, a tusk',result:3}],
 6: [{text:'Mouth on the ventral surface, underneath the head',result:4},{text:'Mouth at the front of the head',result:2}]
};
const WHALES = [
 {name:'Killer whale',scientific:'Orcinus orca',path:[[1,1],[4,1]],alt:'Two black-and-white whales breaching, with heads, upright back fins and side fins visible.',clue:'This whale has teeth. The back has a prominent dorsal fin. Open the feature photographs to inspect teeth and compare the fin, pectoral fins and tail.'},
 {name:'Humpback whale',scientific:'Megaptera novaeangliae',path:[[1,0],[2,0],[3,0]],alt:'Whale rising out of the water, showing its head, underside and an extended side fin.',clue:'This whale has baleen plates rather than teeth. A dorsal fin is present; its pectoral fins are long relative to the body. Baleen is hidden in this photograph.'},
 {name:'Beluga',scientific:'Delphinapterus leucas',path:[[1,1],[4,0],[5,0],[6,1]],alt:'Pale whale underwater, showing a rounded head and smooth back.',clue:'This whale has teeth, a dorsal ridge rather than a dorsal fin, and no long projecting tusk. The mouth is at the front of the head. Use this clue if the mouth opening is hard to see.'},
 {name:'Narwhal',scientific:'Monodon monoceros',path:[[1,1],[4,0],[5,1]],alt:'Whales at the water surface, with a long slender projection extending in front of one head.',clue:'This is a toothed whale with no dorsal fin. The long projection is a tusk: an elongated tooth, not a nose. Teeth do not need to be visible inside the mouth to use the toothed-whale branch.'},
 {name:'Sperm whale',scientific:'Physeter macrocephalus',path:[[1,1],[4,0],[5,0],[6,0]],alt:'Two whales underwater, with large squared heads and narrow lower jaws.',clue:'This whale has teeth, no long projecting tusk, and a dorsal hump with ridges or bumps rather than a typical fin. Its narrow lower jaw and mouth lie on the underside of the head. Follow “no dorsal fin” in this simplified key.'},
 {name:'Blue whale',scientific:'Balaenoptera musculus',path:[[1,0],[2,0],[3,1]],alt:'Long whale viewed from above at the sea surface, showing the body outline.',clue:'This whale has baleen plates. It has a small dorsal fin far back on its body and short pectoral fins relative to its body length. These features may be submerged or too small to resolve in this aerial photograph.'},
 {name:'Bowhead whale',scientific:'Balaena mysticetus',path:[[1,0],[2,1]],alt:'Whale viewed from above beside sea ice, with a broad head, smooth back and tail visible.',clue:'This whale has baleen plates and no dorsal fin. Baleen is inside the mouth and is not visible in this surface photograph.'}
];
const QUESTIONS = [
 'What are four characteristics used to classify whales?',
 'Why might biologists use a key?',
 'Provide an example of when a biologist might use a key to classify whales.',
 'Make a list of other characteristics that could be used to classify whales.',
 'Research to find out more about whales, for example, their distribution ranges and whether a species is threatened or endangered.',
 'Identify eight different trees or shrubs native to your locale and make a dichotomous key that allows others to identify them.'
];
const FIGURE_FACTS = [
 {feeding:'Teeth',length:'6.0 m (females); 6.7 m (males)',mass:'7.4 t (females); 10.5 t (males)'},
 {feeding:'Baleen plates',length:'13.7 m (females); 12.9 m (males)',mass:'25–30 t'},
 {feeding:'Teeth',length:'3.5 m (females); 4.5 m (males)',mass:'1.0 t (females); 1.2 t (males)'},
 {feeding:'Teeth',length:'4.2 m (females); 4.7 m (males)',mass:'900 kg (females); 1.6 t (males)'},
 {feeding:'Teeth',length:'11 m (females); 15 m (males)',mass:'20 t (females); 45 t (males)'},
 {feeding:'Baleen plates',length:'26.5 m (females); 25 m (males)',mass:'200 t (females); 100 t (males)'},
 {feeding:'Baleen plates',length:'14–15 m',mass:'50–60 t'}
];
const $ = id => document.getElementById(id);
const states = WHALES.map(()=>({path:[],revealed:false}));
let current = 0;
function walk(path){let step=1,result=null;for(const [s,c] of path){if(s!==step || result!==null)throw Error('Invalid key path');const choice=KEY[s][c];if(!choice)throw Error('Invalid choice');if(choice.next)step=choice.next;else{result=choice.result;step=null;}}return {step,result};}
function readablePath(path){return path.map(([s,c])=>`${s}${c===0?'A':'B'}`).join(' → ');}
function fullPath(path){return path.map(([s,c])=>`${s}${c===0?'A':'B'}: ${KEY[s][c].text}`).join(' → ');}
function photoFile(n){return `assets/photo-${String(n).padStart(2,'0')}.jpg`;}
function render(focusStep=false){
 const state=states[current],w=WHALES[current],position=walk(state.path);
 $('figure').textContent=`Figure ${current+2}`;
 $('progress').textContent=`Whale ${current+1} of 7 · Figure ${current+2}`;
 $('whale-photo').src=photoFile(current);$('whale-photo').alt=w.alt;
 $('whale-outline').src=`assets/outline-${String(current+2).padStart(2,'0')}.png`;
 $('whale-outline').alt=`Textbook body outline for Figure ${current+2}, showing the head, fins and tail.`;
 $('outline-caption').textContent=`Figure ${current+2} · textbook body outline`;
 $('figure-facts').replaceChildren();
 const facts=FIGURE_FACTS[current];
 [['Mouth structures',facts.feeding],['Adult length',facts.length],['Adult mass',facts.mass]].forEach(([label,value])=>{const p=document.createElement('p');const strong=document.createElement('strong');strong.textContent=label+': ';p.append(strong,document.createTextNode(value));$('figure-facts').append(p);});
 const source=document.createElement('p');source.className='facts-source';source.textContent='Textbook figure information · t = tonnes';$('figure-facts').append(source);
 $('previous').disabled=current===0;$('next').disabled=current===6;
 [...$('cards').children].forEach((el,i)=>el.setAttribute('aria-current',String(i===current)));
 $('clue-content').textContent=w.clue;
 $('step').textContent=position.result===null?`Step ${position.step}`:'Path complete';
 $('choices').replaceChildren();
 if(position.result===null){KEY[position.step].forEach((choice,c)=>{const b=document.createElement('button');b.type='button';const letter=document.createElement('span');letter.className='letter';letter.textContent=c===0?'A':'B';const label=document.createElement('span');label.textContent=choice.text;b.append(letter,label);b.addEventListener('click',()=>choose(c));$('choices').append(b);});}
 else{const result=document.createElement('div');const correct=position.result===current;result.className='identification-result '+(correct?'correct':'incorrect');result.setAttribute('role','status');const name=document.createElement('h3');name.textContent=`Your key leads to: ${WHALES[position.result].name}`;const status=document.createElement('p');status.className='result-status';status.textContent=correct?'Correct identification!':'Incorrect identification. Revisit your choices.';result.append(name,status);if(!correct){const hint=document.createElement('p');hint.textContent='Compare the photograph and figure information. Use Back One Step or Restart Key to try another path.';result.append(hint);}$('choices').append(result);}
 $('trail').replaceChildren();
 if(!state.path.length)$('trail').textContent='Your selected path will appear here.';
 else state.path.forEach(([s,c])=>{const item=document.createElement('span');item.className='trail-item';item.textContent=`${s}${c===0?'A':'B'} · ${KEY[s][c].text}`;$('trail').append(item);});
 $('back').disabled=!state.path.length;$('restart').disabled=!state.path.length&&!state.revealed;
 $('reveal').textContent=state.revealed?'Hide Answer':'Reveal Answer';$('reveal').setAttribute('aria-expanded',String(state.revealed));
 $('answer').hidden=!state.revealed;$('answer').replaceChildren();
 if(state.revealed){const title=document.createElement('h3');title.textContent=w.name;const sci=document.createElement('p');const em=document.createElement('em');em.textContent=w.scientific;sci.append(em);const proposal=document.createElement('p');proposal.textContent=position.result===null?'Proposed result: key path not yet complete.':`Proposed result: ${WHALES[position.result].name}. Actual species: ${w.name}.`;const path=document.createElement('p');path.textContent=`Correct path: ${fullPath(w.path)} → ${w.name}`;$('answer').append(title,sci,proposal,path);if(position.result!==null&&position.result!==current){const revisit=document.createElement('p');revisit.textContent='Compare the features and revisit your choices with Back One Step or Restart Key.';$('answer').append(revisit);}}
 if(focusStep)$('step').focus({preventScroll:true});
}
let confettiTimer;
function clearConfetti(){clearTimeout(confettiTimer);$('confetti').replaceChildren();}
function celebrate(){clearConfetti();if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;const colours=['#16834a','#087b96','#e8af24','#d95c83'];for(let i=0;i<40;i++){const piece=document.createElement('span');piece.className='confetti-piece';piece.style.setProperty('--x',`${Math.random()*100}vw`);piece.style.setProperty('--drift',`${Math.random()*240-120}px`);piece.style.setProperty('--turn',`${360+Math.random()*540}deg`);piece.style.setProperty('--duration',`${1400+Math.random()*300}ms`);piece.style.setProperty('--delay',`${Math.random()*220}ms`);piece.style.backgroundColor=colours[i%colours.length];$('confetti').append(piece);}confettiTimer=setTimeout(clearConfetti,2000);}
function playRedX(){clearConfetti();if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;[[37,38,-12],[50,31,10],[63,39,-8]].forEach(([x,y,turn],i)=>{const piece=document.createElement('span');piece.className='red-x-piece';piece.textContent='×';piece.style.setProperty('--x',x+'%');piece.style.setProperty('--y',y+'%');piece.style.setProperty('--turn',turn+'deg');piece.style.animationDelay=(i*80)+'ms';$('confetti').append(piece);});confettiTimer=setTimeout(clearConfetti,1400);}
function choose(c){const s=states[current],pos=walk(s.path);if(pos.result!==null)return;s.path.push([pos.step,c]);s.revealed=false;render(true);const result=walk(s.path).result;if(result===current)celebrate();else if(result!==null)playRedX();}
function selectWhale(n){if(n<0||n>=7)return;clearConfetti();current=n;render(true);}
WHALES.forEach((w,i)=>{const b=document.createElement('button');b.textContent=`Figure ${i+2}`;b.addEventListener('click',()=>selectWhale(i));$('cards').append(b);});
$('previous').addEventListener('click',()=>selectWhale(current-1));$('next').addEventListener('click',()=>selectWhale(current+1));
$('back').addEventListener('click',()=>{clearConfetti();states[current].path.pop();states[current].revealed=false;render(true);});
$('restart').addEventListener('click',()=>{clearConfetti();states[current].path=[];states[current].revealed=false;render(true);});
$('reveal').addEventListener('click',()=>{states[current].revealed=!states[current].revealed;render();});
let dialogOpeners = new WeakMap();
function openDialog(dialog){dialogOpeners.set(dialog,document.activeElement);dialog.showModal();}
document.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>b.closest('dialog').close()));
document.querySelectorAll('dialog').forEach(d=>{d.addEventListener('close',()=>{const opener=dialogOpeners.get(d);if(opener&&opener.isConnected)opener.focus({preventScroll:true});});d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}});});
function enlarge(n,alt,caption,title){$('lightbox-photo').src=photoFile(n);$('lightbox-photo').alt=alt;$('lightbox-title').textContent=title||`Figure ${current+2} · photograph`;$('lightbox-caption').textContent=caption;$('lightbox-caption').hidden=!caption;openDialog($('photo-dialog'));}
$('enlarge').addEventListener('click',()=>enlarge(current,WHALES[current].alt,''));
$('enlarge-outline').addEventListener('click',()=>{$('lightbox-photo').src=$('whale-outline').src;$('lightbox-photo').alt=$('whale-outline').alt;$('lightbox-title').textContent=`Figure ${current+2} · textbook body outline`;$('lightbox-caption').hidden=false;$('lightbox-caption').textContent='Original body outline from Nelson Biology Alberta 20–30, p. 163.';openDialog($('photo-dialog'));});
$('detail').addEventListener('click',()=>openDialog($('detail-dialog')));
function openComparison(kind){$('lightbox-photo').src=`assets/${kind}-comparison.jpg`;$('lightbox-photo').alt=kind==='teeth'?'Photograph of a whale skull with separate conical teeth in the upper and lower jaws.':'Photograph of a curved rack of whale baleen plates, showing their closely spaced plates and dense fringed edges.';$('lightbox-title').textContent=kind==='teeth'?'Teeth':'Baleen';$('lightbox-caption').textContent='';$('lightbox-caption').hidden=true;openDialog($('photo-dialog'));}
$('show-teeth').addEventListener('click',()=>openComparison('teeth'));
$('show-baleen').addEventListener('click',()=>openComparison('baleen'));
const features=[{n:8,title:'Teeth and mouth',alt:'Whale at the surface with its mouth open, showing individual teeth along the lower jaw.',text:'Look along the lower jaw for individual teeth. This animal in human care has worn teeth, so some are short.'},{n:7,title:'Dorsal fin',alt:'Upright fins above the backs of whales at sea, with the tallest fin toward the left.',text:'Locate the fin on the dorsal surface. Compare its size and shape with the body.'},{n:9,title:'Pectoral fins and tail',alt:'Whale partly out of the water, showing its pectoral fins, underside and tail.',text:'Use the body diagram to locate the side fins and tail.'}];
features.forEach(f=>{const card=document.createElement('article');const b=document.createElement('button');b.setAttribute('aria-label',`Enlarge ${f.title.toLowerCase()} photograph`);const im=document.createElement('img');im.src=photoFile(f.n);im.alt=f.alt;b.append(im);b.addEventListener('click',()=>enlarge(f.n,f.alt,f.text,f.title));const h=document.createElement('h3');h.textContent=f.title;const p=document.createElement('p');p.textContent=f.text;card.append(b,h,p);$('detail-gallery').append(card);});
Object.entries(KEY).forEach(([s,choices])=>{const box=document.createElement('article');box.className='key-reference-step';const h=document.createElement('h3');h.textContent=`Step ${s}`;box.append(h);choices.forEach((c,i)=>{const p=document.createElement('p');p.textContent=`${i===0?'A':'B'}. ${c.text} → ${c.next?`Step ${c.next}`:WHALES[c.result].name}`;box.append(p);});$('key-reference').append(box);});
$('fullkey').addEventListener('click',()=>openDialog($('key-dialog')));
function openBranchingKey(){const chart=document.querySelector('.branch-chart');chart.classList.remove('enlarged');chart.scrollTo(0,0);$('key-size').textContent='Enlarge Key';$('branch-dialog').scrollTop=0;openDialog($('branch-dialog'));}
$('branchkey').addEventListener('click',openBranchingKey);
$('branchkey-reference').addEventListener('click',openBranchingKey);
$('key-size').addEventListener('click',()=>{const chart=document.querySelector('.branch-chart');const enlarged=chart.classList.toggle('enlarged');$('key-size').textContent=enlarged?'Fit Key to Screen':'Enlarge Key';});
$('fullscreen').addEventListener('click',async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else{await $('presentation-viewport').requestFullscreen();$('investigation').scrollIntoView();}}catch{$('fullscreen').textContent='Use browser full screen (F11)';}});
document.addEventListener('fullscreenchange',()=>{$('fullscreen').textContent=document.fullscreenElement?'Exit full screen':'Full screen';});
const scrollRail=$('presentation-scrollbar'),scrollThumb=$('presentation-thumb');
let scrollDrag=null;
function updatePresentationScrollbar(){const surface=document.fullscreenElement;scrollRail.hidden=!surface;if(!surface)return;const range=surface.scrollHeight-surface.clientHeight;const track=scrollRail.clientHeight;const height=Math.min(track,Math.max(90,track*surface.clientHeight/surface.scrollHeight));const fraction=range>0?surface.scrollTop/range:0;scrollThumb.style.height=height+'px';scrollThumb.style.transform=`translateY(${fraction*(track-height)}px)`;scrollRail.setAttribute('aria-valuenow',String(Math.round(fraction*100)));}
document.addEventListener('fullscreenchange',()=>requestAnimationFrame(updatePresentationScrollbar));
$('presentation-viewport').addEventListener('scroll',updatePresentationScrollbar,{passive:true});
window.addEventListener('resize',updatePresentationScrollbar);
new ResizeObserver(()=>requestAnimationFrame(updatePresentationScrollbar)).observe($('top'));
scrollRail.addEventListener('pointerdown',e=>{const surface=document.fullscreenElement;if(!surface)return;e.preventDefault();scrollRail.focus({preventScroll:true});const travel=scrollRail.clientHeight-scrollThumb.offsetHeight;const range=surface.scrollHeight-surface.clientHeight;if(scrollThumb.contains(e.target)){scrollDrag={y:e.clientY,start:surface.scrollTop,travel,range};scrollRail.setPointerCapture(e.pointerId);}else{const box=scrollRail.getBoundingClientRect();surface.scrollTop=Math.max(0,Math.min(1,(e.clientY-box.top-scrollThumb.offsetHeight/2)/Math.max(1,travel)))*range;}updatePresentationScrollbar();});
scrollRail.addEventListener('pointermove',e=>{if(!scrollDrag||!document.fullscreenElement)return;document.fullscreenElement.scrollTop=scrollDrag.start+(e.clientY-scrollDrag.y)/Math.max(1,scrollDrag.travel)*scrollDrag.range;});
scrollRail.addEventListener('pointerup',()=>{scrollDrag=null;});scrollRail.addEventListener('pointercancel',()=>{scrollDrag=null;});
document.addEventListener('keydown',e=>{if(!document.fullscreenElement||!['ArrowUp','ArrowDown'].includes(e.key)||e.ctrlKey||e.metaKey||e.altKey||e.target.closest('textarea,input,[contenteditable]')||document.querySelector('dialog[open]'))return;e.preventDefault();document.fullscreenElement.scrollBy({top:(e.key==='ArrowDown'?1:-1)*Math.max(90,Math.round(innerHeight*.12)),behavior:'auto'});});
document.addEventListener('keydown',e=>{if(e.ctrlKey||e.metaKey||e.altKey||document.querySelector('dialog[open]')||e.target.closest('textarea,input,[contenteditable]'))return;if(!['a','b','ArrowLeft','ArrowRight'].includes(e.key.toLowerCase())&&!['ArrowLeft','ArrowRight'].includes(e.key))return;const r=$('investigation').getBoundingClientRect();if(r.bottom<0||r.top>window.innerHeight)return;switch(e.key.toLowerCase()){case 'a':e.preventDefault();choose(0);break;case 'b':e.preventDefault();choose(1);break;case 'arrowleft':e.preventDefault();selectWhale(current-1);break;case 'arrowright':e.preventDefault();selectWhale(current+1);break;}});
const STORAGE_KEY='biology20-investigation51-responses-v1';let saved={};let storageOK=true;
try{saved=JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}');if(!saved||typeof saved!=='object')saved={};}catch{storageOK=false;}
function saveResponses(){const data={};document.querySelectorAll('textarea').forEach(t=>data[t.id]=t.value);try{localStorage.setItem(STORAGE_KEY,JSON.stringify(data));$('save-status').textContent='Saved in this browser.';storageOK=true;}catch{$('save-status').textContent='Browser storage unavailable. Download responses to keep them.';storageOK=false;}}
QUESTIONS.forEach((q,i)=>{const letter=String.fromCharCode(97+i);const wrap=document.createElement('div');wrap.className='question';const label=document.createElement('label');label.htmlFor=`response-${letter}`;label.textContent=`${letter}. ${q}`;const t=document.createElement('textarea');t.id=label.htmlFor;t.value=typeof saved[t.id]==='string'?saved[t.id]:'';t.rows=3;t.placeholder='Type the class response…';t.addEventListener('input',()=>{t.style.height='auto';t.style.height=Math.max(135,t.scrollHeight+4)+'px';saveResponses();});wrap.append(label,t);$(i<4?'questions':'extensions').append(wrap);});
if(!storageOK)$('save-status').textContent='Browser storage unavailable. Download responses to keep them.';
$('download').addEventListener('click',()=>{const text=['Using a Classification Key','Biology 20 Investigation 5.1','Class discussion',...QUESTIONS.flatMap((q,i)=>[(i===4?'\nOptional Extension Questions\n':'')+String.fromCharCode(97+i)+'. '+q,$(`response-${String.fromCharCode(97+i)}`).value||'(No response)',''])].join('\n');const url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='biology-20-class-responses.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
$('clear').addEventListener('click',()=>openDialog($('clear-dialog')));
$('confirm-clear').addEventListener('click',()=>{document.querySelectorAll('textarea').forEach(t=>{t.value='';t.style.height='';});saveResponses();$('clear-dialog').close();});
WHALES.forEach((w,i)=>{const p=document.createElement('p');const strong=document.createElement('strong');strong.textContent=`Figure ${i+2}: ${w.name}`;const em=document.createElement('em');em.textContent=w.scientific;p.append(strong,document.createTextNode(' · '),em,document.createTextNode(` · ${readablePath(w.path)}`));$('teacher-key').append(p);});
// Static credit data is generated from verified Wikimedia Commons metadata.
function renderCredits(credits){credits.forEach((c,i)=>{const box=document.createElement('article');box.className='credit';const h=document.createElement('h3');h.textContent=c.label || (i<7?`Figure ${i+2} · ${WHALES[i].name}`:`Figure 2 feature photograph · ${i===7?'dorsal fin':i===8?'teeth and mouth':'pectoral fins and tail'}`);const p=document.createElement('p');p.textContent=`Photographer / credit: ${c.artist}. ${c.width} × ${c.height} pixels. ${c.changes}`;const a=document.createElement('a');a.href=c.source;a.textContent='Source and original photograph';const license=document.createElement(c.licenseUrl?'a':'span');if(c.licenseUrl)license.href=c.licenseUrl;license.textContent=c.license;box.append(h,p,a,document.createTextNode(' · '),license);$('credit-list').append(box);});}
renderCredits(IMAGE_CREDITS);
render();
