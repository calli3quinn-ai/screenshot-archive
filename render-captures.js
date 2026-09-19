const collectionRoot = document.querySelector("#collection");

function escapeHTML(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderCapture(capture) {
  const captureNumber = String(capture.number).padStart(2, "0");
  const title = escapeHTML(capture.title);
  const platform = escapeHTML(capture.platform);
  const image = escapeHTML(capture.image);
  const alt = escapeHTML(capture.alt);
  const remark = escapeHTML(capture.remark);

  const sourceLink = capture.sourceUrl
    ? `
      <p class="capture-source">
        <a
          href="${escapeHTML(capture.sourceUrl)}"
          target="_blank"
          rel="noopener"
        >
          View original post
        </a>
      </p>
    `
    : "";

  return `
    <article class="artifact artifact-side">
      <figure class="screenshot">
        <a
          class="screenshot-link"
          href="${image}"
          target="_blank"
          rel="noopener"
          aria-label="Open the full-size screenshot: ${title}"
        >
          <img
            src="${image}"
            alt="${alt}"
            loading="lazy"
          >
        </a>

        <figcaption>
          Screenshot ${captureNumber} · ${platform}
        </figcaption>
      </figure>

      <aside
        class="annotation"
        aria-label="Annotation for ${title}"
      >
        <p class="annotation-label">
          Annotation ${captureNumber}
        </p>

        <h3>${title}</h3>

        

        <div class="annotation-remark">
          <p>${remark}</p>
        </div>

        ${sourceLink}
      </aside>
    </article>
  `;
}

function renderCollection() {
  if (
    !collectionRoot ||
    !Array.isArray(window.collectionData)
  ) {
    return;
  }

  window.collectionData.forEach((week) => {
    const weekSection = document.createElement("section");

    weekSection.className = "week";
    weekSection.id = `week-${week.week}`;

    const captures = Array.isArray(week.captures)
      ? week.captures.map(renderCapture).join("")
      : "";

    weekSection.innerHTML = `
      <header class="week-heading">
        <p class="week-number">
          Week ${escapeHTML(week.week)}
        </p>

        <h2>${escapeHTML(week.heading)}</h2>
      </header>

      ${captures}
    `;

    collectionRoot.appendChild(weekSection);
  });
}

renderCollection();
