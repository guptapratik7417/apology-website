# A Little Apology

A responsive, one-screen-at-a-time apology story inspired by the supplied screen recording. It uses plain HTML, CSS, and JavaScript and is ready for GitHub Pages. The melody button plays the supplied song from `assets/apology-song.mp3`.

The optional client-side login gate is controlled by `enabled` in `login-config.js`. This file is public with the rest of the site; it is a casual prompt, not real access control.

## Run locally

The story is presented one screen at a time. Use Continue/Back, swipe vertically or horizontally, scroll the mouse wheel, or use the arrow/Page keys. Horizontal swipes on the memory cards change photos. Open `index.html` in a browser, or serve this folder with any static file server (for example `python3 -m http.server 8000` from this directory) and visit `http://localhost:8000`.

## Personalize

1. The recipient name is currently Shivangi. To change it, edit `PERSONALIZATION.name` near the top of `script.js`.
2. Edit the headings and paragraphs in `index.html` to change the apology wording.
3. The letter text is in the `.letter-copy` paragraph. The video visibly cuts off after “I choose”, so add your own continuation there if desired.
4. Add your photos as `assets/moment-1.jpeg`, `assets/moment-2.jpeg`, and `assets/moment-3.jpeg` for the memories carousel, or change the image paths in `index.html`. The sign-off in the memories section is Pratik.

The recording appears to show a five-card personal photo carousel, but the video only exposes a few images. The carousel displays the photos you add locally; no unrelated personal images are included.

## Publish with GitHub Pages

Create a public repository, push these files to its `main` branch, then in the repository choose **Settings → Pages → Deploy from a branch → main → /(root)**. GitHub Pages will show the published URL and deployment status in that section.
