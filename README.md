# Proton

A responsive, motion-led landing page for Proton, built with React, TypeScript, and Vite.

The site presents Proton as a physician-support tool for working with clinical information and
routine workflows. It explicitly leaves diagnosis and treatment decisions with clinicians.

## Run locally

From this directory:

```sh
npm install
npm run dev
```

Create and preview a production build with:

```sh
npm run build
npm run preview
```

Run the linter with `npm run lint`.

## Video and image assets

- Put video files in `public/videos/` and poster images in `public/images/`.
- Update the `backgroundVideos` map near the top of `src/App.tsx` to change a clip or poster.
- Use the source video's aspect ratio in its media frame in `src/App.css`. Editorial and portrait clips use `object-fit: contain`, so the full frame stays visible without stretching or cropping.
- Landscape clips play as cinematic, full-section backdrops with `object-fit: cover`. Portrait clips have their own tall frame beside the related copy, with enough height to keep the original composition intact.
- Videos load only as their section approaches the viewport and pause when it leaves. With reduced motion enabled, the poster is shown without loading or autoplaying the video.
- The additional imagery and clips supplied in the local `zzzz` folder are woven between the product sections, each alongside copy about Proton's clinician-support purpose. Clips play on request and retain their original proportions.
- Supplied visuals are identified as conceptual material, not product screens, patient records or clinical evidence.

The page uses `clinical-intelligence.mp4`, `connected-care.mp4`, `cosmic-perspective.mp4`, `digital-human.mp4`, and `neural-intelligence.mp4` for the main experience. The full supplied media set is presented throughout the page.
