const themeToggle = document.getElementById("themeToggle");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
let savedTheme;
try {
  savedTheme = localStorage.getItem("theme");
} catch {
  /* Storage is optional. */
}
function applyTheme(theme) {
  const dark = theme === "dark";
  document.body.classList.toggle("dark-theme", dark);
  document.body.classList.toggle("light-theme", !dark);
  if (themeToggle) {
    themeToggle.setAttribute(
      "aria-label",
      `Switch to ${dark ? "light" : "dark"} mode`,
    );
    themeToggle.setAttribute("aria-pressed", String(dark));
  }
}
applyTheme(savedTheme || (systemTheme.matches ? "dark" : "light"));
themeToggle?.addEventListener("click", () => {
  savedTheme = document.body.classList.contains("dark-theme")
    ? "light"
    : "dark";
  applyTheme(savedTheme);
  try {
    localStorage.setItem("theme", savedTheme);
  } catch {
    /* Keep the current theme in memory. */
  }
});
systemTheme.addEventListener("change", (event) => {
  if (!savedTheme) applyTheme(event.matches ? "dark" : "light");
});
const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");
function closeMenu() {
  navigation?.classList.remove("open");
  menuToggle?.setAttribute("aria-expanded", "false");
}
menuToggle?.addEventListener("click", () => {
  const expanded = navigation?.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(Boolean(expanded)));
});
navigation?.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeMenu();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
    if (document.activeElement?.closest("#navigation")) menuToggle?.focus();
  }
});
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
const typedText = document.querySelector(".typed-text");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
if (typedText) {
  const words = ["React.js", "Node.js", "MongoDB", "Python"];
  let word = 0;
  let removing = true;
  let timer;
  function tick() {
    const target = words[word];
    const length = typedText.textContent.length;
    typedText.textContent = target.slice(0, removing ? length - 1 : length + 1);
    let delay = removing ? 55 : 110;
    if (!typedText.textContent) {
      removing = false;
      word = (word + 1) % words.length;
      delay = 250;
    } else if (typedText.textContent === target && !removing) {
      removing = true;
      delay = 1800;
    }
    timer = window.setTimeout(tick, delay);
  }
  function syncAnimation() {
    clearTimeout(timer);
    if (reducedMotion.matches)
      typedText.textContent = "React.js · Node.js · Python";
    else {
      word = 0;
      removing = true;
      typedText.textContent = words[0];
      timer = window.setTimeout(tick, 1800);
    }
  }
  reducedMotion.addEventListener("change", syncAnimation);
  syncAnimation();
}

const contactForm = document.getElementById("contactForm");
if (contactForm) {
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const status = document.getElementById("formStatus");
  let submitting = false;
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (submitting || !contactForm.reportValidity()) return;
    submitting = true;
    submitButton.disabled = true;
    contactForm.setAttribute("aria-busy", "true");
    status.textContent = "Sending your message…";
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: new FormData(contactForm),
        headers: { Accept: "application/json" },
        signal: controller.signal,
      });
      if (!response.ok) {
        status.textContent =
          response.status === 429
            ? "Too many attempts. Please wait a little before trying again, or email me directly."
            : "Your message could not be sent. Please try again, or email me directly.";
        return;
      }
      status.textContent = "Message sent. Taking you to the confirmation page…";
      window.location.assign(
        new URL("thank-you.html", window.location.href).href,
      );
    } catch {
      status.textContent =
        "We couldn’t confirm delivery. Please check your connection and try again, or email me directly.";
    } finally {
      window.clearTimeout(timeout);
      submitting = false;
      submitButton.disabled = false;
      contactForm.removeAttribute("aria-busy");
    }
  });
}
