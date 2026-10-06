# Verification

Checked on 6 October 2026 using the installed Microsoft Edge browser through Playwright, served from a nested repository-style URL (`/whale-classification/`). Also checked directly from a local `file:` URL. No GitHub deployment was performed.

## Passed

- All 12 branches of the six-step key, reaching exactly seven endpoints.
- All seven correct paths through the actual on-screen choice buttons:
  - Figure 2: 1B → 4B → Killer whale (*Orcinus orca*)
  - Figure 3: 1A → 2A → 3A → Humpback whale (*Megaptera novaeangliae*)
  - Figure 4: 1B → 4A → 5A → 6B → Beluga (*Delphinapterus leucas*)
  - Figure 5: 1B → 4A → 5B → Narwhal (*Monodon monoceros*)
  - Figure 6: 1B → 4A → 5A → 6A → Sperm whale (*Physeter macrocephalus*)
  - Figure 7: 1A → 2A → 3B → Blue whale (*Balaenoptera musculus*)
  - Figure 8: 1A → 2B → Bowhead whale (*Balaena mysticetus*)
- Endpoints immediately show the species reached, plus green correct or red incorrect feedback. Reveal provides the actual species, scientific name and correct path.
- Deliberately choosing the bowhead endpoint for Figure 2 shows the proposed species and red feedback immediately, and the actual species after reveal. Backtracking and restarting remove endpoint feedback and hide the revealed answer.
- Previous/Next, figure selection, feature clues, feature gallery, lightbox and full-key panel.
- Modal close buttons, Escape, nested lightbox behavior, focus restoration, A/B and arrow shortcuts, and Enter activation. Shortcuts do not alter the key while typing.
- Touch-event taps on choices, reveal, back, restart, gallery, full key, Previous and Next.
- Full-screen entry and exit in the test browser.
- Autosave and reload restoration for class and optional responses; text-file download includes both; clear cancellation preserves responses; confirmed clear persists after reload.
- All ten local photographs decode successfully and are 1920–2400 pixels wide. Source species and licences checked using Commons records; images visually inspected. Photos maintain proportions without cropping. Embedded metadata removed; filenames and pre-reveal alt text do not name species.
- Main photograph and both current choices visible together at 1920 × 1080, 1366 × 768 and 1024 × 768. Also checked a 390 × 844 mobile layout for horizontal overflow and button size.
- Every visible button, linked button and disclosure control at least 60 CSS pixels high.
- No missing assets, failed HTTP requests or JavaScript page errors. Runtime resources all use local relative paths. Direct local-file preview also loads the key and photograph.
- Visual review of opening diagram, classroom layouts, feature gallery and full-key panel.

## Practical limits

Browser verification used Edge; other browser engines and physical classroom smartboard hardware were not directly tested. Actual GitHub Pages publication remains the teacher's upload step. Browser settings can disable localStorage or fullscreen; the site displays a storage warning or fullscreen fallback. Browser downloads may require the browser's normal permission setting.

Species names deliberately appear at completed key paths and in the figure answer key, full-key reference and image credits. Reveal Answer shows the actual species and full correct path.

## Presentation revisions

Fullscreen light background and backdrop verified with a dark browser colour preference. Redrawn black-and-white orca diagram visually checked at desktop and laptop sizes; SVG label bounding boxes do not overlap. Requested extra footer wording removed.

## Visible information and endpoint feedback revisions

Rechecked all seven correct endpoints, an incorrect endpoint, automatic species names, green/red notifications, confetti and its reduced-motion suppression, backtracking/restart cleanup, visible textbook figure data for all seven whales, and directly visible feature descriptions for Figures 3–8. Requested teacher prose and suggested responses removed; all six question textboxes retained. Responses still persist on reload. Diagram background changed to light grey.

Photo and both choices verified together at 1920 × 1080, 1366 × 768, 1280 × 1024, 1024 × 1024 and 768 × 768, including long Step 6 statements at 768 × 768. No horizontal overflow or JavaScript errors. Figure information and long path trails remain accessible by scrolling on compact screens.

## Extracted textbook artwork

Replaced the original SVG schematic with an unchanged crop of textbook Figure 1 rendered directly from PDF page 83. Extracted all seven blue body outlines from PDF page 84 and verified each against its correct figure. Outlines display immediately and have working lightboxes. Figure 1 and all outlines decode; no missing files or JavaScript errors. Immediate outline visibility checked at 1920 × 1080, 1366 × 768, 1024 × 1024 and 768 × 768. Previous SVG-specific verification is historical and no longer applies to the displayed diagram.

## Opening comparison photos and wording

Title verified on one line with no horizontal overflow at widths 1920, 1366, 1024, 768, 390 and 320. Teeth and Baleen buttons open the respective locally downloaded, verified CC BY-SA photographs, with successful image decoding, touch activation, Escape close and focus restoration. Requested feature-clue instruction, key-length sentence, human-care view sentence and main-photo lightbox caption removed. Twelve photograph credit records render without JavaScript errors.

## Feature access, branching reference and presentation scrolling

Removed Reveal Feature Clue and moved Feature photographs beneath Teeth and Baleen; verified it is never hidden for any selected figure. All figure feature descriptions remain visible. Branching reference verified for all 12 statements and seven endpoints, modal close/focus restoration, and scrollable desktop/square/mobile layouts. Text backgrounds prevent connector lines crossing labels.

Fullscreen has an always-visible 56-pixel scrollbar with a draggable thumb, verified by mouse drag. Up/Down arrows move the fullscreen page. Actual touch-event swipes were verified in fullscreen and normal page view. Input and modal exclusions preserve typing and panel behavior.

## Fit-to-screen key, printing, red-X feedback and Firefox scrolling change

Branching key opens fully fitted without scrolling at 1920 × 1080, 1366 × 768, 1024 × 1024 and 768 × 768. Optional enlargement is retained; each new opening resets to fit view. Print button invokes browser printing; print CSS produces one A4 page with the full branching key and questions a–d beneath it. A generated print proof was visually inspected and text-checked for all four questions and all seven species.

Incorrect endpoint displays a brief three-symbol red-X effect; reduced-motion suppresses it, and Restart clears it. Fullscreen now targets a dedicated element with its own overflow scrolling, rather than the page body. The existing 56-pixel scrollbar, mouse drag, touch drag, page swipes and Up/Down scrolling pass in Edge with this new container. Installed Firefox could not start its automation connection in this environment, so the Firefox-specific change remains unverified in that browser.

## Compact branching-key controls

Print, enlargement and close controls now use compact text-style buttons. The panel devotes its remaining height to the key. Full-key fit without scrolling, enlargement, print invocation and PDF question layout rechecked at 1920 × 1080, 1366 × 768, 1024 × 1024 and 768 × 768. Main teaching control sizes are unchanged; reference-panel controls are intentionally smaller at the teacher request.

## Clean PDF worksheet with answer boxes

The Print / Save PDF control now opens assets/classification-key.pdf directly rather than printing the website. The generated PDF contains one A4 page, the full key, four boxed questions with 26 mm box height and writing space, and the textbook source. Header/footer generation explicitly disabled. Page count and all four questions text-checked; file URLs absent. Rendered page visually reviewed for clipping, readability and box spacing. Printable link remains relative and the compact key panel still fits.
