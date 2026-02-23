// Scroll suave para âncoras
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', function(e){
    const target = document.querySelector(this.getAttribute('href'));
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth'});
    }
  });
});

// Botão "Voltar ao topo"
const back = document.getElementById('backToTop');
window.addEventListener('scroll', ()=>{
  if(window.scrollY > 400) back.style.display = 'block';
  else back.style.display = 'none';
});
back.addEventListener('click', ()=> window.scrollTo({top:0,behavior:'smooth'}));

//hero slider
// HERO SLIDER
const slides = document.querySelectorAll(".hero-slider .slide");
const prevBtn = document.querySelector(".hero-slider .prev");
const nextBtn = document.querySelector(".hero-slider .next");

let currentSlide = 0;
let slideInterval;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (i === index) slide.classList.add("active");
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

// botões
nextBtn.addEventListener("click", () => {
  nextSlide();
  resetInterval();
});
prevBtn.addEventListener("click", () => {
  prevSlide();
  resetInterval();
});

// troca automática
function startInterval() {
  slideInterval = setInterval(nextSlide, 2500); // muda a cada 2.5s
}

function resetInterval() {
  clearInterval(slideInterval);
  startInterval();
}

startInterval();

// SLIDER DE COLEÇÃO
document.querySelectorAll("[data-colecao]").forEach(slider => {
  const inner = slider.querySelector(".colecao-inner");
  const boxes = slider.querySelectorAll(".box");
  const prev = slider.querySelector(".prev");
  const next = slider.querySelector(".next");

  let index = 0;
  const visible = 3; // quantos boxes aparecem ao mesmo tempo

  function update() {
    inner.style.transform = `translateX(${-index * (300 + 16)}px)`; 
    // 300px box + 16px margin
  }

  next.addEventListener("click", () => {
    if (index < boxes.length - visible) index++;
    update();
  });

  prev.addEventListener("click", () => {
    if (index > 0) index--;
    update();
  });

  update();
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


// SLIDER DE COLEÇÃO
document.querySelectorAll("[data-colecao]").forEach(slider => {
  const inner = slider.querySelector(".colecao-inner");
  const boxes = slider.querySelectorAll(".box");
  const prev = slider.querySelector(".prev");
  const next = slider.querySelector(".next");

  let index = 0;
  const visible = 3; // desktop: 3 por vez

  function update() {
    if (window.innerWidth > 768) { 
      inner.style.transform = `translateX(${-index * (300 + 16)}px)`; 
    } else {
      inner.style.transform = "none"; // mobile/tablet: sem translate
    }
  }

  if (window.innerWidth > 768) {
    next.addEventListener("click", () => {
      if (index < boxes.length - visible) index++;
      update();
    });

    prev.addEventListener("click", () => {
      if (index > 0) index--;
      update();
    });
  }

  update();

  // Recalcula ao redimensionar
  window.addEventListener("resize", update);
});
