 const modal = document.getElementById('modal');
  const modalImg = modal.querySelector('img');
  const closeModal = document.getElementById('closeModal');

  document.querySelectorAll('.main-image img, .thumbnails img').forEach(img => {
    img.addEventListener('click', () => {
      modal.classList.add('active');
      modalImg.src = img.dataset.full || img.src;
    });
  });

  closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
    modalImg.src = '';
  });
  modal.addEventListener('click', e => {
    if(e.target === modal){
      modal.classList.remove('active');
      modalImg.src = '';
    }
  });

  document.querySelectorAll('.thumbnails img').forEach(thumb => {
    thumb.addEventListener('click', e => {
      const mainImg = e.target.closest('.main-image').querySelector('img:first-child');
      mainImg.src = e.target.dataset.full;
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
