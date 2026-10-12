# Portfolio

A responsive, single-page portfolio built with plain JavaScript and Bootstrap 5 styling. No build step or package installation is required; Bootstrap CSS is loaded from a CDN.

## Personalize it

Edit `content.json` to update the site title and description, profile, experience, projects, education, skills, languages, awards, and contact details. Set a project's `image` or the profile's `image` to an image path (for example, `images/project-one.jpg`) to show your own image. Keep image files in the repository alongside the JSON file.

The page fetches `content.json` at runtime, so open it through a local web server rather than directly as a `file://` URL. For example, use the VS Code Live Server extension or run `python -m http.server` from the project directory, then visit `http://localhost:8000`. Adjust the technical theme and layout overrides in `styles.css`.

The decorative project previews are made with CSS, so the site works without image assets. The font import uses Google Fonts; if you prefer not to load fonts from an external service, remove the `@import` at the top of `styles.css` to use the system sans-serif fallbacks.

## Publish with GitHub Pages

1. Create a GitHub repository for the site. For a personal site, name it `your-username.github.io`; for a project site, any repository name works.
2. Add `index.html`, `app.js`, `content.json`, `styles.css`, and this README to the repository's root and push them to the `main` branch.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then click **Save**.
5. Wait for the Pages deployment to finish. Your site will be available at `https://your-username.github.io/` for a personal site, or `https://your-username.github.io/repository-name/` for a project site.

Changes pushed to the selected branch will be published automatically.
