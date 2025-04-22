// Toggle the active class on navbar items for mobile menu (hamburger)
const navLinks = document.querySelector('.nav-links');
const navToggle = document.querySelector('.navbar-toggle');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Smooth scrolling on click for anchor links
const scrollLinks = document.querySelectorAll('a[href^="#"]');
scrollLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    window.scrollTo({
      top: targetElement.offsetTop - 80, // offset for fixed navbar
      behavior: 'smooth'
    });
  });
});

// Gallery hover effect
const galleryImages = document.querySelectorAll('.gallery-item img');
galleryImages.forEach(image => {
  image.addEventListener('mouseover', () => {
    image.style.transform = 'scale(1.05)';
  });
  image.addEventListener('mouseout', () => {
    image.style.transform = 'scale(1)';
  });
});

// Scroll animations - simple fade in
const fadeInElements = document.querySelectorAll('.fade-in');
window.addEventListener('scroll', () => {
  fadeInElements.forEach(el => {
    const position = el.getBoundingClientRect();
    if (position.top < window.innerHeight) {
      el.classList.add('visible');
    } else {
      el.classList.remove('visible');
    }
  });
});

// Adding "visible" class for fade-in effect when the element is in view
document.addEventListener('DOMContentLoaded', () => {
  fadeInElements.forEach(el => {
    const position = el.getBoundingClientRect();
    if (position.top < window.innerHeight) {
      el.classList.add('visible');
    }
  });
});
