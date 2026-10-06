# Using a Classification Key

A static classroom smartboard activity for Biology 20 Investigation 5.1. All photographs are included locally. No build, backend, API keys, external fonts or paid services are required.

## Upload to GitHub Pages

1. Extract the ZIP. Open the `whale-classification` folder.
2. On GitHub, create a **public** repository, for example `biology-20-whales` (public repositories support GitHub Pages on GitHub Free).
3. Choose **Add file → Upload files**. Drag the contents of `whale-classification` into the upload area, including the `assets` folder. Upload the files inside the folder, rather than nesting the entire folder: `index.html` should be at the repository root. Commit the upload to `main`.
4. Open **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, then select **main** and **/(root)**. Save.
5. When publishing finishes, use **Visit site** in Pages settings. The project address will look like `https://YOUR-USERNAME.github.io/biology-20-whales/`. Allow several minutes for the first publication.

The empty `.nojekyll` file disables Jekyll processing. If your browser uploader hides this dotfile, create it using **Add file → Create new file**, name it `.nojekyll`, and commit it with an empty body. The site also works without it because all resource filenames are ordinary static files.

GitHub guidance: [Creating a GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site) and [Configuring a publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site). Instructions checked 6 October 2026.

## Teach with the site

- The opening section includes Teeth and Baleen buttons with clear, locally stored comparison photographs and source credits.
- Open the site in a recent Chrome, Edge, Firefox or Safari. Select **Begin the investigation**. **Full screen** opens the investigation in presentation view; F11 is a browser fallback where supported.
- Figures 2–8 follow the textbook order. New figures begin at Step 1; returning to a figure retains its current path for this session.
- Read both statements, then select A or B. Completed paths immediately show the species reached and a green correct or red incorrect notification. Correct identification plays a brief confetti effect; incorrect identification plays a brief red-X effect. Both effects are disabled when the browser requests reduced motion. **Reveal Answer** can still be used at any point to show the actual species, scientific name and correct path; after a different proposed result, it also shows the actual species for comparison.
- Use **Back One Step** or **Restart Key** to revisit a path. Changing a choice hides the answer again. **Hide Answer** also closes the answer display.
- Tap a photograph for an uncropped large view. Each figure also immediately displays its textbook body outline; tap the outline for a large view. The opening section has an additional gallery of real feature photographs. Every figure shows its textbook tooth/baleen, adult length and adult mass data. Every figure also shows feature information directly beside the photograph. The always-available **Feature photographs** button sits beneath Teeth and Baleen in the opening section.
- **Show Full Key**, **Figure answer key** and **Image credits** contain species names; open them deliberately. Correctness and the proposed identification now appear immediately at an endpoint; the actual species and correct path remain available through Reveal Answer.
- **Show Branching Key** opens a text-only branching diagram in the opening section; **View as Branching Key** opens the same view inside Show Full Key. The branching key opens fitted to the screen. Enlarge Key enables a larger scrollable view. Print / Save PDF opens the included, ready-made one-page PDF in a new tab. It contains the key and four boxed questions with writing space, without browser addresses, dates or page-number headers/footers. Use the PDF viewer to print or download it.
- In fullscreen, an always-visible 56-pixel-wide scrollbar supports mouse and touch dragging. Fullscreen uses a dedicated scroll container to avoid browser differences in body scrolling. Up/Down arrows scroll the page unless typing in a textbox or viewing a modal. Touch swipes work throughout the page in both normal and fullscreen modes.
- Main teaching controls are at least 60 CSS pixels high; the branching-key panel uses compact text-style controls to leave more space for the diagram. Tab moves between controls; Enter or Space activates buttons. A/B selects a statement; left/right arrows change figure while the investigation is in view. Shortcuts are suspended inside dialogs and textboxes. Escape closes a dialog. Full-screen exit also follows your browser's Escape behavior.
- Responses expand while typing and can also be resized vertically. All six responses save automatically to localStorage and restore on reload. Storage belongs to the current browser, device and site origin. Private browsing, browser cleanup, a different device or a changed site address can remove or separate responses. Download a text copy to retain them. Clear requires confirmation. No responses are uploaded to a server.

## Files

`index.html`, `styles.css`, `script.js`, `.nojekyll`, `README.md`, `IMAGE-CREDITS.md`, `VERIFICATION.md`, and `assets/` (photographs, the extracted textbook Figure 1 and seven body outlines, credit metadata and script). Keep the structure intact. All runtime asset paths are relative, including on a GitHub Pages project repository.

For an offline preview, double-click `index.html`. Browser storage and fullscreen behavior on local files may vary; use the GitHub Pages address for the classroom and persistence. The website makes no external runtime requests; external source links are only opened when selected.

## Source and teaching scope

Adapted from Investigation 5.1, “Using a Classification Key,” *Nelson Biology Alberta 20–30*, pp. 162–163 (pages 83–84 of the user-provided `3_-_unit_20b.pdf`). The supplied branching logic and figure order are preserved; scientific spellings are corrected. The original textbook photographs are not redistributed. Figure 1 and the seven blue body outlines are rendered directly from the textbook PDF and included as requested.

The simplified key is for these seven species only. “No dorsal fin” includes whales with ridges or bumps. The narwhal projection is a tusk, not its nose, and not every individual has a visible tusk. Clues explain hidden features without requiring students to infer teeth, baleen or mouth position from unsuitable views. No current conservation status is supplied; that is an optional research task.

Photographs keep their proportions and are displayed with `object-fit: contain`; no important anatomy is removed through cropping. Attribution, source links, licences and resizing records appear in `IMAGE-CREDITS.md`, `assets/credits.json` and the classroom credit section. Retain these when sharing or modifying the site. Each photograph retains its stated licence, including the applicable ShareAlike terms. Original interface code is provided under the MIT licence in `LICENSE`; the textbook acknowledgement does not grant rights to the textbook.

Figure 1 and the body outlines in Figures 2–8 are unchanged crops rendered from the provided textbook PDF. These textbook assets retain their original rights and are separate from the openly licensed replacement photographs and original interface code.
