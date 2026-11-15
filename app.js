const FILES = {
  about: { path: "about.md", label: "about.md", language: "Markdown" },
  projects: { path: "projects/", label: "projects", language: "Explorer" },
  experience: { path: "experience.md", label: "experience.md", language: "Markdown" },
  stack: { path: "stack.json", label: "stack.json", language: "JSON" },
  contact: { path: "contact.json", label: "contact.json", language: "JSON" }
};

const PROJECT_FILE_PREFIX = "project-";
const PROJECT_ALIASES = {
  taskflow: "taskflow",
  "easy delivery": "easy-delivery",
  "easy-delivery": "easy-delivery",
  easydelivery: "easy-delivery",
  lexia: "lexia"
};

let portfolio = null;
let projectById = new Map();
let openTabs = ["about"];
let activeFile = "about";
let commandHistory = [];
let historyIndex = 0;

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

function element(tagName, className = "", text = "") {
  const node = document.createElement(tagName);
  if (className) node.className = className;
  if (text !== "") node.textContent = text;
  return node;
}

function projectFileId(project) {
  return `${PROJECT_FILE_PREFIX}${project.id}`;
}

function getFileDescriptor(fileId) {
  if (fileId.startsWith(PROJECT_FILE_PREFIX)) {
    const projectId = fileId.slice(PROJECT_FILE_PREFIX.length);
    const project = projectById.get(projectId);
    if (!project) return null;
    return {
      path: `projects/${project.file}`,
      label: project.file,
      language: "JSON",
      project
    };
  }
  return FILES[fileId] || null;
}

function safeExternalUrl(url) {
  if (typeof url !== "string") return null;
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:" || !["github.com", "www.linkedin.com"].includes(parsed.hostname)) return null;
    return parsed.href;
  } catch {
    return null;
  }
}

function createExternalLink(url, label, className = "inline-action") {
  const href = safeExternalUrl(url);
  if (!href) return null;
  const anchor = element("a", className, label);
  anchor.href = href;
  anchor.target = "_blank";
  anchor.rel = "noopener noreferrer";
  return anchor;
}

function renderTabs() {
  const tabs = $("#file-tabs");
  if (!tabs) return;
  tabs.replaceChildren();

  for (const fileId of openTabs) {
    const descriptor = getFileDescriptor(fileId);
    if (!descriptor) continue;
    const tab = element("button", `editor-tab${fileId === activeFile ? " is-active" : ""}`);
    tab.type = "button";
    tab.id = `file-tab-${fileId}`;
    tab.tabIndex = fileId === activeFile ? 0 : -1;
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-selected", String(fileId === activeFile));
    tab.setAttribute("aria-controls", "file-content");
    tab.dataset.tabFile = fileId;
    const iconClass = descriptor.language === "JSON" ? "icon-json" : descriptor.language === "Explorer" ? "folder-icon" : "icon-md";
    const iconLabel = descriptor.language === "JSON" ? "{ }" : descriptor.language === "Explorer" ? "▰" : "M";
    const fileIcon = element("span", `file-icon ${iconClass}`, iconLabel);
    fileIcon.setAttribute("aria-hidden", "true");
    tab.append(fileIcon, document.createTextNode(` ${descriptor.label}`));
    tabs.append(tab);
  }
}

function updateFileSelection() {
  const path = $("#current-file-path");
  const language = $("#editor-language");
  const descriptor = getFileDescriptor(activeFile);
  if (path && descriptor) path.textContent = descriptor.path;
  if (language && descriptor) language.textContent = descriptor.language;

  const navFile = activeFile.startsWith(PROJECT_FILE_PREFIX) ? "projects" : activeFile;
  $$("[data-file]").forEach((button) => {
    const isNavItem = Boolean(button.closest(".primary-nav"));
    const isSelected = button.dataset.file === (isNavItem ? navFile : activeFile);
    button.classList.toggle("is-active", isSelected);
    if (button.matches(".primary-nav [data-file], .tree-item, .mobile-file-list [data-file]")) {
      if (isSelected) button.setAttribute("aria-current", "page");
      else button.removeAttribute("aria-current");
    }
  });

  const panel = $("#file-content");
  if (panel) panel.setAttribute("aria-labelledby", `file-tab-${activeFile}`);
}

function openFile(fileId, options = {}) {
  if (!getFileDescriptor(fileId)) return false;
  if (!openTabs.includes(fileId)) openTabs.push(fileId);
  activeFile = fileId;
  renderTabs();
  updateFileSelection();
  renderActiveFile();

  const mobileExplorer = $("#mobile-explorer");
  if (mobileExplorer && window.matchMedia("(max-width: 760px)").matches) mobileExplorer.open = false;
  if (options.scroll) $(".workspace-shell")?.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth", block: "start" });
  return true;
}

function reducedMotion() {
  return Boolean(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches);
}

function appendFileKicker(container, path, comment = "") {
  const kicker = element("p", "file-kicker");
  kicker.append(document.createTextNode(path));
  if (comment) {
    const suffix = element("span", "syntax-comment", `  // ${comment}`);
    kicker.append(suffix);
  }
  container.append(kicker);
}

function renderAbout(container) {
  const about = portfolio.about;
  appendFileKicker(container, "# about.md", "profile / read-only");
  container.append(element("h2", "", about.title));

  const grid = element("div", "profile-grid");
  const main = element("div", "profile-main");
  about.paragraphs.forEach((paragraph) => main.append(element("p", "", paragraph)));
  const principle = element("p", "principle-line");
  principle.append(element("span", "principle-mark", "//"), document.createTextNode(` ${about.principle}`));
  main.append(principle);

  const aside = element("aside", "profile-aside");
  aside.setAttribute("aria-label", "Resumo profissional");
  aside.append(element("p", "aside-label", "SESSION / PROFILE"));
  aside.append(element("p", "", portfolio.profile.role));
  aside.append(element("p", "", portfolio.profile.focus));
  if (portfolio.profile.education) aside.append(element("p", "", portfolio.profile.education));
  aside.append(element("p", "", portfolio.profile.location));
  const actions = element("div", "file-actions");
  const projectsButton = element("button", "inline-action", "Abrir projetos ↗");
  projectsButton.type = "button";
  projectsButton.dataset.file = "projects";
  actions.append(projectsButton);
  const contactButton = element("button", "inline-action", "Contato ↗");
  contactButton.type = "button";
  contactButton.dataset.file = "contact";
  actions.append(contactButton);
  aside.append(actions);

  grid.append(main, aside);
  container.append(grid);
}

function createProjectArtwork(project, variant = "detail") {
  const figure = element("figure", `project-artwork project-artwork-${variant}`);
  const surface = element("div", "project-artwork-surface");
  const image = element("img", "project-artwork-image");
  image.src = new URL(project.image, import.meta.url).href;
  image.alt = project.imageAlt || `${project.title} — diagrama técnico conceitual, não é captura da interface.`;
  image.loading = "lazy";
  image.decoding = "async";
  image.addEventListener("error", () => {
    image.remove();
    surface.append(element("div", "artwork-fallback", `${project.title} · diagrama indisponível`));
  }, { once: true });
  surface.append(image);

  if (project.logo) {
    const brand = element("span", "project-artwork-brand");
    const logo = element("img", "project-brand-logo");
    logo.src = new URL(project.logo, import.meta.url).href;
    logo.alt = project.logoAlt || `Logomarca do projeto ${project.title}; não é captura da aplicação.`;
    logo.loading = "lazy";
    logo.decoding = "async";
    logo.addEventListener("error", () => brand.remove(), { once: true });
    brand.append(logo);
    surface.append(brand);
  }

  const caption = element("figcaption", "project-artwork-caption");
  caption.append(element("span", "artwork-kind", project.imageKind === "diagram" ? "DIAGRAMA TÉCNICO" : "ASSET VISUAL"));
  caption.append(element("span", "", project.imageNote || "Visual conceitual; não é captura da interface."));
  figure.append(surface, caption);
  return figure;
}

function createProjectCard(project, variant = "featured") {
  const card = element("article", `project-card project-card-${variant} project-${project.id}`);
  card.append(createProjectArtwork(project, variant));

  const copy = element("div", "project-card-copy");
  const number = String(portfolio.projects.indexOf(project) + 1).padStart(2, "0");
  copy.append(element("p", "project-card-kicker", `${number} / ${project.status}`));
  copy.append(element("h3", "", project.title));
  copy.append(element("p", "project-card-category", project.category));
  copy.append(element("p", "project-card-description", project.description));

  if (Array.isArray(project.highlightTech) && project.highlightTech.length) {
    const stack = element("p", "project-card-stack");
    stack.append(element("span", "project-card-stack-label", "CORE"), document.createTextNode(` ${project.highlightTech.join(" · ")}`));
    copy.append(stack);
  }

  const actions = element("div", "project-card-actions");
  const open = element("button", "project-card-open", "Inspecionar projeto ↗");
  open.type = "button";
  open.dataset.file = projectFileId(project);
  actions.append(open);
  const repo = createExternalLink(project.repoUrl, "GitHub", "project-card-repo");
  if (repo) actions.append(repo);
  copy.append(actions);
  card.append(copy);
  return card;
}

function renderFeaturedProjects() {
  const grid = $("#featured-project-grid");
  if (!grid) return;
  grid.replaceChildren();
  portfolio.projects.forEach((project) => grid.append(createProjectCard(project, "featured")));
}

function renderProjectIndex(container) {
  appendFileKicker(container, "projects/", "verified scope / select a project");
  container.append(element("h2", "", "Três projetos, três problemas."));
  container.append(element("p", "project-index-intro", "Cada ficha separa o problema, a abordagem e as funcionalidades encontradas no repositório público."));
  const list = element("div", "project-index-grid");
  portfolio.projects.forEach((project) => list.append(createProjectCard(project, "index")));
  container.append(list);
}

function renderProject(project, container) {
  const view = element("article", `project-view project-${project.id}`);
  const intro = element("div", "project-detail-intro");
  const heading = element("div", "project-detail-heading");
  const meta = element("div", "file-meta");
  meta.append(element("span", "pill project-category", project.category));
  meta.append(element("span", "pill pill-cyan", project.status));
  heading.append(meta, element("h2", "", project.title), element("p", "project-description", project.description));

  const actions = element("div", "project-detail-actions");
  const repo = createExternalLink(project.repoUrl, "Abrir repositório ↗", "project-repo");
  if (repo) actions.append(repo);
  heading.append(actions);
  if (project.projectNote) heading.append(element("p", "project-note", project.projectNote));

  intro.append(heading, createProjectArtwork(project, "detail"));
  view.append(intro);

  const outcomes = element("div", "project-outcomes");
  const problem = element("section", "project-outcome project-outcome-problem");
  problem.append(element("p", "project-section-label", "Problema"), element("p", "", project.problem));
  const approach = element("section", "project-outcome project-outcome-approach");
  approach.append(element("p", "project-section-label", project.objectiveLabel || "Abordagem"), element("p", "", project.objective));
  outcomes.append(problem, approach);
  view.append(outcomes);

  if (Array.isArray(project.features) && project.features.length) {
    const featureSection = element("section", "project-feature-section");
    const featureHeading = element("div", "project-subheading");
    featureHeading.append(element("p", "project-section-label", "Implementação observada"));
    featureHeading.append(element("span", "project-evidence", "VERIFICADO NO REPOSITÓRIO"));
    featureSection.append(featureHeading);
    const features = element("ul", "feature-list project-feature-list");
    project.features.forEach((feature) => features.append(element("li", "", feature)));
    featureSection.append(features);
    view.append(featureSection);
  }

  const stackSection = element("section", "project-stack-section");
  const stackHeading = element("div", "project-subheading");
  stackHeading.append(element("p", "project-section-label", "Tecnologias por contexto"));
  stackHeading.append(element("span", "project-evidence", "AGRUPADO POR CONTEXTO"));
  stackSection.append(stackHeading);

  const groups = element("div", "project-stack-groups");
  if (Array.isArray(project.technologyGroups) && project.technologyGroups.length) {
    project.technologyGroups.forEach((group) => {
      const row = element("div", "project-stack-group");
      row.append(element("span", "project-stack-label", group.label));
      const items = element("div", "project-stack-items");
      group.items.forEach((item) => items.append(element("span", "tech-chip", item)));
      row.append(items);
      groups.append(row);
    });
  } else if (Array.isArray(project.technologies)) {
    const items = element("div", "project-stack-items");
    project.technologies.forEach((item) => items.append(element("span", "tech-chip", item)));
    groups.append(items);
  }
  stackSection.append(groups);
  if (project.technologyNote) stackSection.append(element("p", "project-tech-note", project.technologyNote));
  view.append(stackSection);
  container.append(view);
}

function renderExperience(container) {
  const experience = portfolio.experience;
  appendFileKicker(container, "# experience.md", "professional experience");
  container.append(element("h2", "", "Software em contexto real."));
  const timeline = element("div", "experience-timeline");
  timeline.append(element("span", "timeline-mark"));
  const copy = element("div", "timeline-copy");
  copy.append(element("p", "file-meta-text", "PROFESSIONAL / MUNICIPAL SYSTEMS"));
  copy.append(element("h3", "", experience.organization));
  copy.append(element("p", "", experience.summary));
  copy.append(element("p", "project-section-label", "Áreas de atuação"));
  const list = element("ul", "feature-list");
  experience.areas.forEach((area) => list.append(element("li", "", area)));
  copy.append(list);
  copy.append(element("p", "privacy-note", experience.privacy));
  timeline.append(copy);
  container.append(timeline);
}

function renderStack(container) {
  appendFileKicker(container, "stack.json", "agrupado por contexto de uso");
  container.append(element("h2", "", "Stack por contexto."));
  container.append(element("p", "", "O foco principal é backend .NET/C#. As demais tecnologias aparecem conforme a necessidade do sistema ou do projeto."));

  const groups = element("div", "stack-sections");
  portfolio.stack.forEach((group) => {
    const row = element("section", "stack-row");
    row.append(element("h3", "", group.category));
    const chips = element("div", "tech-list");
    group.items.forEach((item) => chips.append(element("span", "tech-chip", item)));
    row.append(chips);
    groups.append(row);
  });
  container.append(groups);

  const details = element("details", "json-details");
  const summary = element("summary", "", "Ver stack.json com syntax highlighting");
  const pre = element("pre", "json-code");
  const code = element("code");
  highlightJson(JSON.stringify(portfolio.stack, null, 2), code);
  pre.append(code);
  details.append(summary, pre);
  container.append(details);
}

function highlightJson(source, target) {
  const tokenPattern = /("(?:\\.|[^"\\])*"(?=\s*:)|"(?:\\.|[^"\\])*"|\b(?:true|false|null)\b|-?\d+(?:\.\d+)?|[{}\[\],:])/g;
  let lastIndex = 0;
  let match;
  while ((match = tokenPattern.exec(source)) !== null) {
    if (match.index > lastIndex) target.append(document.createTextNode(source.slice(lastIndex, match.index)));
    const token = match[0];
    let className = "tok-punctuation";
    if (token.startsWith('"')) className = tokenPattern.lastIndex < source.length && /^\s*:/.test(source.slice(tokenPattern.lastIndex)) ? "tok-key" : "tok-string";
    else if (/^-?\d/.test(token)) className = "tok-number";
    else if (/^(true|false|null)$/.test(token)) className = "tok-literal";
    const span = element("span", className, token);
    target.append(span);
    lastIndex = tokenPattern.lastIndex;
  }
  if (lastIndex < source.length) target.append(document.createTextNode(source.slice(lastIndex)));
}

function renderContact(container) {
  appendFileKicker(container, "contact.json", "connections / open channels");
  container.append(element("h2", "", "Contato sem intermediários."));
  container.append(element("p", "", "Para conversar sobre backend, integração, sistemas geoespaciais ou projetos, estes são os canais públicos."));

  const grid = element("div", "contact-grid");
  const entries = [
    { label: "GITHUB", value: "jvitorsi-dev", url: portfolio.contact.github },
    { label: "LINKEDIN", value: "João Vitor Silva", url: portfolio.contact.linkedin },
    { label: "EMAIL", value: portfolio.contact.email, url: `mailto:${portfolio.contact.email}` }
  ];
  entries.forEach((entry) => {
    const href = entry.label === "EMAIL" ? entry.url : safeExternalUrl(entry.url);
    if (!href) return;
    const anchor = element("a", "contact-link");
    anchor.href = href;
    anchor.append(element("small", "", entry.label), element("strong", "", entry.value));
    if (entry.label !== "EMAIL") {
      anchor.target = "_blank";
      anchor.rel = "noopener noreferrer";
    }
    grid.append(anchor);
  });
  container.append(grid);
}

function renderActiveFile() {
  const container = $("#file-content");
  const descriptor = getFileDescriptor(activeFile);
  if (!container || !descriptor) return;
  container.replaceChildren();

  if (activeFile === "about") renderAbout(container);
  else if (activeFile === "projects") renderProjectIndex(container);
  else if (activeFile === "experience") renderExperience(container);
  else if (activeFile === "stack") renderStack(container);
  else if (activeFile === "contact") renderContact(container);
  else if (descriptor.project) renderProject(descriptor.project, container);
}

function updateArchitecture(componentId) {
  const component = portfolio.architecture.components.find((item) => item.id === componentId);
  if (!component) return;
  $("#architecture-detail-title").textContent = component.label;
  $("#architecture-detail-copy").textContent = component.role;

  $$("[data-component]").forEach((node) => {
    const selected = node.dataset.component === componentId;
    node.classList.toggle("is-selected", selected);
    node.setAttribute("aria-pressed", String(selected));
  });
}

function appendTerminalLine(text, className = "") {
  const output = $("#terminal-output");
  if (!output) return;
  const line = element("p", `terminal-line${className ? ` ${className}` : ""}`);
  line.textContent = text;
  output.append(line);
  output.scrollTop = output.scrollHeight;
}

function normalizeInput(input) {
  return input.trim().replace(/\s+/g, " ");
}

function getProjectFromAlias(alias) {
  const normalized = alias.toLowerCase().replace(/\.json$/, "").replace(/^projects\//, "");
  const projectId = PROJECT_ALIASES[normalized];
  return projectId ? portfolio.projects.find((project) => project.id === projectId) : null;
}

function resolveFileAlias(alias) {
  const normalized = alias.toLowerCase().replace(/^\.\//, "");
  const direct = Object.entries(FILES).find(([, file]) => file.path.toLowerCase() === normalized || file.label.toLowerCase() === normalized);
  if (direct) return direct[0];
  if (["about", "projects", "experience", "stack", "contact"].includes(normalized)) return normalized;
  const project = getProjectFromAlias(normalized);
  return project ? projectFileId(project) : null;
}

function parseCommand(input) {
  const normalized = normalizeInput(input);
  if (!normalized) return { type: "empty" };
  const [command, ...args] = normalized.split(" ");
  const name = command.toLowerCase();
  const argument = args.join(" ");

  if (name === "help") return { type: "help" };
  if (name === "clear") return { type: "clear" };
  if (name === "whoami") return { type: "whoami" };
  if (name === "about") return { type: "open", file: "about" };
  if (name === "experience") return { type: "open", file: "experience" };
  if (name === "stack") return { type: "open", file: "stack" };
  if (name === "contact") return { type: "open", file: "contact" };
  if (name === "projects") {
    if (!argument) return { type: "open", file: "projects" };
    const project = getProjectFromAlias(argument);
    return project ? { type: "open", file: projectFileId(project) } : { type: "unknown-project", query: argument };
  }
  if (name === "architecture" || name === "diagram") return { type: "scroll", target: "engineering" };
  if (name === "open" || name === "cat") {
    const file = resolveFileAlias(argument);
    return file ? { type: "open", file } : { type: "unknown-file", query: argument };
  }
  return { type: "unknown-command", command: name };
}

function runCommand(rawCommand) {
  const result = parseCommand(rawCommand);
  if (result.type === "empty") return;
  appendTerminalLine(`jv.dev $ ${rawCommand}`, "terminal-command");

  if (result.type === "clear") {
    $("#terminal-output").replaceChildren();
    return;
  }
  if (result.type === "help") {
    appendTerminalLine("help · whoami · about · projects [taskflow|easy-delivery|lexia]");
    appendTerminalLine("experience · stack · contact · architecture · clear");
    appendTerminalLine("open <arquivo> também aceita about.md, stack.json ou projects/EasyDelivery.json.", "terminal-muted");
    return;
  }
  if (result.type === "whoami") {
    openFile("about");
    appendTerminalLine(`${portfolio.profile.name} · ${portfolio.profile.focus}`, "terminal-success");
    return;
  }
  if (result.type === "open") {
    openFile(result.file);
    appendTerminalLine(`Abriu ${getFileDescriptor(result.file).path}`, "terminal-success");
    return;
  }
  if (result.type === "scroll") {
    document.getElementById(result.target)?.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth", block: "start" });
    appendTerminalLine("Diagrama conceitual em foco.", "terminal-success");
    return;
  }
  if (result.type === "unknown-project") {
    appendTerminalLine(`Projeto não encontrado: ${result.query}. Use projects para ver a lista.`, "terminal-error");
    return;
  }
  if (result.type === "unknown-file") {
    appendTerminalLine(`Arquivo não encontrado: ${result.query || "(vazio)"}. Use help para ver opções.`, "terminal-error");
    return;
  }
  appendTerminalLine(`Comando não reconhecido: ${result.command}. Digite help.`, "terminal-error");
}

function bindTerminal() {
  const form = $("#terminal-form");
  const input = $("#terminal-input");
  if (!form || !input) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const command = input.value.trim();
    if (!command) return;
    commandHistory.push(command);
    historyIndex = commandHistory.length;
    runCommand(command);
    input.value = "";
  });

  input.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!commandHistory.length) return;
      historyIndex = Math.max(0, historyIndex - 1);
      input.value = commandHistory[historyIndex] || "";
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      historyIndex = Math.min(commandHistory.length, historyIndex + 1);
      input.value = commandHistory[historyIndex] || "";
    }
  });
}

function bindInterface() {
  document.addEventListener("click", (event) => {
    const fileTrigger = event.target.closest("[data-file]");
    if (fileTrigger) {
      event.preventDefault();
      const shouldScroll = Boolean(fileTrigger.closest(".primary-nav, .hero-actions, .featured-project-grid"));
      openFile(fileTrigger.dataset.file, { scroll: shouldScroll });
      return;
    }

    const tabTrigger = event.target.closest("[data-tab-file]");
    if (tabTrigger) {
      const fileId = tabTrigger.dataset.tabFile;
      openFile(fileId);
      $$('[data-tab-file]').find((tab) => tab.dataset.tabFile === fileId)?.focus();
      return;
    }

    const architectureTrigger = event.target.closest("[data-component]");
    if (architectureTrigger) updateArchitecture(architectureTrigger.dataset.component);
  });

  document.addEventListener("keydown", (event) => {
    const tabTrigger = event.target.closest?.("[data-tab-file]");
    if (tabTrigger && ["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
      event.preventDefault();
      const currentIndex = openTabs.indexOf(tabTrigger.dataset.tabFile);
      let nextIndex = currentIndex;
      if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + openTabs.length) % openTabs.length;
      else if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % openTabs.length;
      else if (event.key === "Home") nextIndex = 0;
      else if (event.key === "End") nextIndex = openTabs.length - 1;
      const nextFile = openTabs[nextIndex];
      openFile(nextFile);
      $$('[data-tab-file]').find((tab) => tab.dataset.tabFile === nextFile)?.focus();
      return;
    }

    const architectureTrigger = event.target.closest?.(".architecture-node[data-component]");
    if (architectureTrigger && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      updateArchitecture(architectureTrigger.dataset.component);
    }
  });
}

function initActiveFile() {
  renderTabs();
  updateFileSelection();
  renderActiveFile();
  updateArchitecture("frontend");

  const terminal = $("#terminal-panel");
  if (terminal && window.matchMedia("(min-width: 761px)").matches) terminal.open = true;
}

async function bootstrap() {
  try {
    const dataUrl = new URL("./data/portfolio.json", import.meta.url);
    const response = await fetch(dataUrl, { headers: { Accept: "application/json" } });
    if (!response.ok) throw new Error(`Portfolio data returned ${response.status}`);
    portfolio = await response.json();
    projectById = new Map(portfolio.projects.map((project) => [project.id, project]));
    renderFeaturedProjects();
    bindInterface();
    bindTerminal();
    initActiveFile();
  } catch (error) {
    console.error("JV.DEV portfolio initialization failed:", error);
    const content = $("#file-content");
    if (content) {
      content.replaceChildren(element("h2", "", "Workspace indisponível"));
      content.append(element("p", "", "Não foi possível carregar data/portfolio.json. Abra esta aplicação por um servidor HTTP estático, como o GitHub Pages ou python -m http.server."));
    }
    appendTerminalLine("Falha ao carregar portfolio.json.", "terminal-error");
  }
}

bootstrap();
