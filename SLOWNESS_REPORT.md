# Results found by Codex 5.3. when asked what slows performance down currently
# Codex also ran npm run build to investigate
# 23 April 2026 - no action taken immediately


High-Impact Recommendations (Priority Order)
Compress and convert story chapter images first
Move public/story/chapter*/image*.png from PNG to WebP/AVIF and generate responsive sizes.

Current reality: ~77.5 MB total, ~2.0–3.4 MB per chapter image.
Good target: ~200–500 KB per displayed image.
Add lazy-loading + async decode to all <img>
In src/App.jsx, src/StoryHorizontal.jsx, and src/visual_dictionary/ImageList.jsx, use loading="lazy" and decoding="async" for non-critical images.

This cuts initial page pressure immediately, especially on mobile.
Code-split routes with React.lazy
src/App.jsx eagerly imports Story, Quiz, VisualDictionary, Articles, About, PrivacyEtc.

Your build already warns about a large main chunk (~597 KB minified).
Route lazy-loading is a straightforward win.
Optimize visual dictionary images next (biggest asset bucket)
public/visual_dictionary is ~94 MB.

Several topic folders are very heavy (numbers_and_time, weather_and_nature, etc.).
Same fix as story: WebP/AVIF + size variants + lazy loading.
Remove debug logging inside playback/update loops
src/StoryHorizontal.jsx has repeated console.log in audio time update paths.

These run frequently and can cause jank while audio plays/highlights update.
Debounce/reduce progress fetches on route changes
In src/App.jsx, progress summary refetches are tied to location changes.

Consider fetch-on-auth-change + explicit refresh after relevant actions, instead of every path navigation.
Delete or archive unused heavy media variants
Unused files like image21_old.png, image5_wrong_shape.png, image6_wrong_shape.png add avoidable weight.

Small but free cleanup.
Move large experimental assets out of src tree
src/story/chapter1/subtitles_experimental is ~51.8 MB / 1174 files.

Even if not bundled, this can slow watcher/indexing/dev experience.
Other Issues Besides Large Images
Large eager JS payload (not just media): route components are loaded up front from src/App.jsx.
Potential runtime jank from high-frequency logs in src/StoryHorizontal.jsx.
Over-fetching risk in progress logic in src/App.jsx.
Visual dictionary screen can burst-load many images at once via src/visual_dictionary/ImageList.jsx.
Some repository clutter (backup/experimental files) likely impacts development speed and maintainability.
Practical “Do This Week” Plan
Story images: convert + resize + lazy load.
Route lazy-loading in src/App.jsx.
Remove debug logs in src/StoryHorizontal.jsx.
Visual dictionary image optimization pass.
Clean unused/experimental heavy files.
If you want, I can implement steps 1–3 directly in the next pass (that should give the most noticeable improvement fastest)