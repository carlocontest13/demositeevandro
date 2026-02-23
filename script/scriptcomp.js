document.addEventListener("DOMContentLoaded", function() {
  const modal = document.getElementById('modal');
  const modalImg = modal.querySelector('img');
  const closeModal = document.getElementById('closeModal');
  // Abrir modal ao clicar na imagem principal
  document.querySelectorAll('.main-image img').forEach(img => {
    img.addEventListener('click', () => {
      modal.classList.add('active');
      modalImg.src = img.src;
    });
  });
  // Trocar imagem principal ao clicar na miniatura
  document.querySelectorAll('.thumbnails img').forEach(thumb => {
    thumb.addEventListener('click', function(e) {
      e.stopPropagation(); // evita abrir modal junto
      const mainImg = this.closest('.main-image').querySelector('img');
      mainImg.src = this.dataset.full;
    });
  });
  // Fechar modal
closeModal.addEventListener('click', () => {
modal.classList.remove('active');
modalImg.src ='';
  });
modal.addEventListener('click', e => {
if (e.target ===modal) {
modal.classList.remove('active');
modalImg.src ='';
    }
  });
});


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
