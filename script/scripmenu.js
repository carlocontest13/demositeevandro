// ===== MENU HAMBURGUER =====
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

// Abre/fecha o menu
menuToggle.addEventListener('click', () => {
  nav.classList.toggle('active');
});

// Fecha o menu ao clicar em qualquer link
document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
  });
});