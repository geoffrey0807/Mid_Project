document.addEventListener("DOMContentLoaded", () => {
  const revealPage = () => {
    document.body.classList.add("page-loaded");
  };

  // Preload background images
  const bgElements = Array.from(document.querySelectorAll("*")).filter(
    (el) => window.getComputedStyle(el).backgroundImage !== "none",
  );

  const imagePromises = bgElements.map((el) => {
    const bg = window.getComputedStyle(el).backgroundImage;
    const url =
      bg !== "none" ? bg.replace(/url\(['"]?(.*?)['"]?\)/, "$1") : null;
    if (!url) return Promise.resolve();

    return new Promise((resolve) => {
      const img = new Image();
      img.src = url;
      img.onload = resolve;
      img.onerror = resolve;
    });
  });

  Promise.all(imagePromises).then(revealPage);
  setTimeout(revealPage, 700);

  // Smooth exit transition on link clicks
  const links = document.querySelectorAll(
    'a[href]:not([target="_blank"]):not([href^="#"])',
  );

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetUrl = link.getAttribute("href");
      if (!targetUrl) return;

      e.preventDefault();
      document.body.classList.remove("page-loaded");

      setTimeout(() => {
        window.location.href = targetUrl;
      }, 500);
    });
  });
});

const container = document.getElementById("music-notes-container");
const noteSymbols = ["♪", "♫", "♬", "♩", "♭", "♮"];

function createNote() {
  const note = document.createElement("span");
  note.classList.add("floating-note");

  // Pick a random musical symbol
  note.textContent =
    noteSymbols[Math.floor(Math.random() * noteSymbols.length)];

  // Random horizontal starting position (0% to 100% width)
  note.style.left = Math.random() * 100 + "vw";

  // Randomize font size (between 18px and 36px)
  const size = Math.random() * 18 + 18;
  note.style.fontSize = `${size}px`;

  // Randomize animation duration (between 6s and 12s for slow floating)
  const duration = Math.random() * 6 + 6;
  note.style.animationDuration = `${duration}s`;

  container.appendChild(note);

  // Remove the note from DOM once animation finishes to prevent lag
  setTimeout(() => {
    note.remove();
  }, duration * 1000);
}

// Spawn a new note every 600ms (adjust timing for more/fewer notes)
setInterval(createNote, 600);
