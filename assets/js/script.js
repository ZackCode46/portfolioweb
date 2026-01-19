document.addEventListener("DOMContentLoaded", () => {
  // Navbar Toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Typing Animation

const heroText = document.querySelector('.hero-text h1');
const originalHTML = heroText.innerHTML.replace(/\n/g, "<br>"); // preserve <br>
const cleanText = heroText.innerText.trim();

heroText.innerHTML = "Hi👋😄, I'm Fazila Zaki, Welcome to my"; // kosongin isi dulu

[...cleanText].forEach((char, i) => {
  const span = document.createElement("span");
  span.textContent = char;
  span.style.animationDelay = `${i * 0.05}s`;
  span.classList.add("wave-letter");
  heroText.appendChild(span);
});

  // Fade In on Scroll
  const faders = document.querySelectorAll('.fade-in');
  const appearOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -100px 0px"
  };

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('appear');
      observer.unobserve(entry.target);
    });
  }, appearOptions);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });

  // Project Card Hover
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // Parallax Background
  const bg = document.getElementById('bg-animation');
  if (bg) {
    document.addEventListener('mousemove', (e) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      bg.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
    });
  }

// === CUSTOM RING CURSOR ===
const cursor = document.createElement("div");
cursor.classList.add("custom-cursor");
document.body.appendChild(cursor);

// Update posisi kursor mengikuti mouse
document.addEventListener("mousemove", (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

// Hover interaktif (membesar saat di atas link atau button)
const interactiveElements = document.querySelectorAll("a, button, .btn, .btn-secondary");

interactiveElements.forEach(el => {
  el.addEventListener("mouseenter", () => {
    cursor.classList.add("cursor-hover");
  });
  el.addEventListener("mouseleave", () => {
    cursor.classList.remove("cursor-hover");
  });
});
})
