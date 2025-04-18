// script.js

// Smooth scroll ke section
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
  
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
  
  // Toggle section kontak (optional, bisa diaktifkan kalau lo mau tombol show/hide)
  const contactSection = document.querySelector('.contact');
  const toggleBtn = document.createElement('button');
  toggleBtn.textContent = "Tampilkan/Sembunyikan Kontak";
  toggleBtn.style.marginBottom = '15px';
  toggleBtn.style.padding = '8px 14px';
  toggleBtn.style.border = 'none';
  toggleBtn.style.backgroundColor = '#0055a5';
  toggleBtn.style.color = '#fff';
  toggleBtn.style.borderRadius = '8px';
  toggleBtn.style.cursor = 'pointer';
  
  contactSection.parentNode.insertBefore(toggleBtn, contactSection);
  
  toggleBtn.addEventListener('click', () => {
    contactSection.classList.toggle('hidden');
  });
  
  