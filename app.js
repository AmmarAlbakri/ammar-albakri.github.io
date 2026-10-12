const escapeHTML = (value) =>
  String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });

const renderHeadline = (items) =>
  items
    .map(
      (item, index) =>
        `<span class="${index === items.length - 1 ? "heading-accent" : ""}">${escapeHTML(item)}</span>`,
    )
    .join("");

const renderExperience = (role, technologyListLabel) => `
  <article class="experience-card row g-0">
    <div class="experience-period col-md-2">${escapeHTML(role.period)}</div>
    <div class="experience-details col-md-10">
      <div class="experience-heading">
        <div>
          <h3>${escapeHTML(role.title)}</h3>
          <p class="experience-company">${escapeHTML(role.company)} <span aria-hidden="true">/</span> ${escapeHTML(role.location)}</p>
        </div>
      </div>
      <p class="experience-summary">${escapeHTML(role.summary)}</p>
      <ul class="detail-list">
        ${role.highlights.map((highlight) => `<li>${escapeHTML(highlight)}</li>`).join("")}
      </ul>
      <ul class="tag-list" aria-label="${escapeHTML(technologyListLabel)}">
        ${role.technologies.map((technology) => `<li class="badge">${escapeHTML(technology)}</li>`).join("")}
      </ul>
    </div>
  </article>`;

const renderProject = (project) => {
  const visual = project.image
    ? `<img src="${escapeHTML(project.image)}" alt="${escapeHTML(project.imageAlt)}" />`
    : `<div class="project-art project-art--${escapeHTML(project.visualStyle)}" role="img" aria-label="${escapeHTML(project.imageAlt)}"><span class="art-grid" aria-hidden="true"></span><span class="art-node art-node-one" aria-hidden="true"></span><span class="art-node art-node-two" aria-hidden="true"></span><span class="art-line art-line-one" aria-hidden="true"></span><span class="art-line art-line-two" aria-hidden="true"></span></div>`;

  return `
    <article class="project-card card h-100 col">
      <div class="project-visual">
        ${visual}
        <span class="project-number">${escapeHTML(project.number)}</span>
        <span class="project-category">${escapeHTML(project.category)}</span>
      </div>
      <div class="project-content">
        <h3>${escapeHTML(project.name)}</h3>
        <p class="project-summary">${escapeHTML(project.summary)}</p>
        <dl class="project-facts">
          ${project.facts.map((fact) => `<div><dt>${escapeHTML(fact.label)}</dt><dd>${escapeHTML(fact.value)}</dd></div>`).join("")}
        </dl>
        <ul class="detail-list">
          ${project.highlights.map((highlight) => `<li>${escapeHTML(highlight)}</li>`).join("")}
        </ul>
      </div>
    </article>`;
};

const renderGroup = (group) => `
  <section class="skill-group">
    <h4>${escapeHTML(group.label)}</h4>
    <ul class="tag-list">
      ${group.items.map((item) => `<li class="badge">${escapeHTML(item)}</li>`).join("")}
    </ul>
  </section>`;

const renderIntroGraphic = (profile) =>
  profile.image
    ? `<img class="intro-photo" src="${escapeHTML(profile.image)}" alt="${escapeHTML(profile.imageAlt)}" />`
    : `<div class="intro-graphic" aria-hidden="true">
        <span class="graphic-cross graphic-cross-one"></span>
        <span class="graphic-cross graphic-cross-two"></span>
        <span class="graphic-ring"></span>
        <span class="graphic-core">${escapeHTML(profile.name.charAt(0))}</span>
      </div>`;

const renderPage = (content) => {
  const app = document.querySelector("#app");

  document.documentElement.lang = content.language;
  document.title = content.meta.title;
  document.querySelector('meta[name="description"]').content =
    content.meta.description;
  document.querySelector('meta[name="theme-color"]').content =
    content.meta.themeColor;

  app.innerHTML = `
    <header class="site-header navbar navbar-expand-lg">
      <a class="wordmark navbar-brand" href="#intro" aria-label="${escapeHTML(content.profile.name)}">${escapeHTML(content.profile.name)}<span aria-hidden="true">.</span></a>
      <nav class="nav" aria-label="${escapeHTML(content.navigation.label)}">
        ${content.navigation.links.map((link) => `<a class="nav-link" href="${escapeHTML(link.href)}">${escapeHTML(link.label)}</a>`).join("")}
      </nav>
      <a class="header-contact btn btn-outline-primary btn-sm" href="mailto:${escapeHTML(content.contact.email)}">${escapeHTML(content.navigation.contactLabel)} <span aria-hidden="true">${escapeHTML(content.symbols.externalLink)}</span></a>
    </header>

    <main>
      <section class="intro-section section-shell container" id="intro">
        <div class="row align-items-center gy-5 intro-row">
          <div class="intro-copy col-md-7">
            <p class="eyebrow"><span class="status-mark" aria-hidden="true"></span>${escapeHTML(content.profile.role)} <span class="eyebrow-divider" aria-hidden="true">/</span> ${escapeHTML(content.profile.location)}</p>
            <h1>${renderHeadline(content.profile.headline)}</h1>
            <p class="intro-highlight">${escapeHTML(content.profile.highlight)}</p>
            <p class="intro-description">${escapeHTML(content.profile.introduction)}</p>
            <ul class="tag-list focus-list">
              ${content.profile.focus.map((item) => `<li class="badge">${escapeHTML(item)}</li>`).join("")}
            </ul>
            <a class="text-link" href="#experience">${escapeHTML(content.navigation.links[1].label)} <span aria-hidden="true">${escapeHTML(content.symbols.down)}</span></a>
          </div>
          <div class="intro-side col-md-5">
            ${renderIntroGraphic(content.profile)}
            <div class="profile-highlights">
              ${content.profile.highlights.map((item, index) => `<div class="profile-stat"><span class="stat-index">0${index + 1}</span><strong>${escapeHTML(item.value)}</strong><span>${escapeHTML(item.label)}</span></div>`).join("")}
            </div>
          </div>
        </div>
        <div class="section-index" aria-hidden="true">${String(1).padStart(2, "0")} <span></span> ${String(content.navigation.links.length).padStart(2, "0")}</div>
      </section>

      <section class="content-section section-shell container" id="experience">
        <div class="section-heading">
          <div>
            <p class="eyebrow">${escapeHTML(content.experience.eyebrow)}</p>
            <h2>${escapeHTML(content.experience.title)}<span class="accent-dot">.</span></h2>
          </div>
          <p>${escapeHTML(content.experience.intro)}</p>
        </div>
        <div class="experience-list">
          ${content.experience.roles.map((role) => renderExperience(role, content.ui.technologyListLabel)).join("")}
        </div>
      </section>

      <section class="content-section projects-section container-fluid" id="projects">
        <div class="section-shell">
          <div class="section-heading">
            <div>
              <p class="eyebrow">${escapeHTML(content.projects.eyebrow)}</p>
              <h2>${escapeHTML(content.projects.title)}<span class="accent-dot">.</span></h2>
            </div>
            <p>${escapeHTML(content.projects.intro)}</p>
          </div>
          <div class="project-grid row row-cols-1 row-cols-md-2 g-4">
            ${content.projects.items.map(renderProject).join("")}
          </div>
        </div>
      </section>

      <section class="content-section section-shell container other-section" id="other">
        <div class="section-heading">
          <div>
            <p class="eyebrow">${escapeHTML(content.other.eyebrow)}</p>
            <h2>${escapeHTML(content.other.title)}<span class="accent-dot">.</span></h2>
          </div>
        </div>
        <div class="other-grid row row-cols-1 row-cols-md-2 g-4">
          <article class="info-card education-card card h-100 col">
            <p class="card-index">${escapeHTML(content.other.education.number)} <span aria-hidden="true">/</span> ${escapeHTML(content.other.education.heading)}</p>
            <h3>${escapeHTML(content.other.education.degree)}</h3>
            <p class="info-subheading">${escapeHTML(content.other.education.institution)} <span aria-hidden="true">·</span> ${escapeHTML(content.other.education.location)}</p>
            <p class="info-period">${escapeHTML(content.other.education.period)}</p>
            <ul class="detail-list">
              ${content.other.education.details.map((detail) => `<li>${escapeHTML(detail)}</li>`).join("")}
            </ul>
          </article>

          <article class="info-card toolkit-card card h-100 col">
            <p class="card-index">${escapeHTML(content.other.skills.number)} <span aria-hidden="true">/</span> ${escapeHTML(content.other.skills.heading)}</p>
            ${content.other.skills.groups.map(renderGroup).join("")}
          </article>

          <article class="info-card languages-card card h-100 col">
            <p class="card-index">${escapeHTML(content.other.languages.number)} <span aria-hidden="true">/</span> ${escapeHTML(content.other.languages.heading)}</p>
            <dl class="language-list">
              ${content.other.languages.items.map((item) => `<div><dt>${escapeHTML(item.name)}</dt><dd>${escapeHTML(item.level)}</dd></div>`).join("")}
            </dl>
          </article>

          <article class="info-card recognition-card card h-100 col">
            <p class="card-index">${escapeHTML(content.other.recognition.number)} <span aria-hidden="true">/</span> ${escapeHTML(content.other.recognition.heading)}</p>
            <ul class="recognition-list">
              ${content.other.recognition.items.map((item) => `
                <li>
                  <strong>${escapeHTML(item.title)}</strong>
                  <span>${escapeHTML(item.detail)}</span>
                  ${item.scores ? `<ul class="score-list">${item.scores.map((score) => `<li><span>${escapeHTML(score.name)}</span><strong>${escapeHTML(score.score)}</strong></li>`).join("")}</ul>` : ""}
                </li>`).join("")}
            </ul>
          </article>
        </div>
      </section>

      <section class="contact-section" id="contact">
        <div class="section-shell container">
          <div class="row align-items-end g-4 contact-layout">
          <div class="col-lg-7">
            <p class="eyebrow">${escapeHTML(content.contact.eyebrow)}</p>
            <h2>${renderHeadline(content.contact.title)}</h2>
            <p class="contact-intro">${escapeHTML(content.contact.intro)}</p>
          </div>
          <div class="contact-details col-lg-5">
            <a class="contact-email" href="mailto:${escapeHTML(content.contact.email)}">${escapeHTML(content.contact.email)} <span aria-hidden="true">${escapeHTML(content.symbols.externalLink)}</span></a>
            <a href="tel:${escapeHTML(content.contact.phone.replace(/\s/g, ""))}">${escapeHTML(content.contact.phoneDisplay)}</a>
            <span>${escapeHTML(content.contact.location)}</span>
          </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="site-footer section-shell">
      <a class="wordmark" href="#intro">${escapeHTML(content.footer.label)}<span aria-hidden="true">.</span></a>
      <span>${escapeHTML(content.footer.note)} <span aria-hidden="true">·</span> ${new Date().getFullYear()}</span>
      <a href="#intro">${escapeHTML(content.footer.backToTop)} <span aria-hidden="true">${escapeHTML(content.symbols.up)}</span></a>
    </footer>`;
};

try {
  const response = await fetch("./content.json");
  if (!response.ok) {
    throw new Error(`Unable to load content.json (${response.status}).`);
  }
  renderPage(await response.json());
} catch (error) {
  console.error("Unable to render the portfolio.", error);
  document.querySelector("#app").textContent =
    "Portfolio content could not be loaded. Check that the site is served over HTTP and content.json is available.";
}
