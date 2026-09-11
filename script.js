const menuButton = document.getElementById("menuButton");
const navMenu = document.getElementById("navMenu");
const navLinks = [...document.querySelectorAll(".nav-menu a")];

function closeMenu() {
  navMenu.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
}

menuButton.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  document.body.classList.toggle("menu-open", isOpen);
});

navLinks.forEach((link) => link.addEventListener("click", closeMenu));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
    });
  });
}, { rootMargin: "-35% 0px -55%", threshold: 0 });

document.querySelectorAll("main section[id]").forEach((section) => sectionObserver.observe(section));

const profileImage = document.getElementById("profileImage");
const portraitFallback = document.getElementById("portraitFallback");
profileImage.addEventListener("error", () => {
  profileImage.style.display = "none";
  portraitFallback.style.display = "grid";
});

document.getElementById("year").textContent = new Date().getFullYear();
