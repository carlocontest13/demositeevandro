// script.js - versão revisada e robusta para scroll / snap / arrows

/* Smooth anchor scrolling */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', function(e){
    const target = document.querySelector(this.getAttribute('href'));
    if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth'}); }
  });
});

/* Back-to-top */
const back = document.getElementById('backToTop');
if (back) {
  window.addEventListener('scroll', ()=>{ back.style.display = (window.scrollY > 400) ? 'block' : 'none'; });
  back.addEventListener('click', ()=> window.scrollTo({top:0,behavior:'smooth'}));
}

/* HERO slider (unchanged behavior) */
const heroSlides = document.querySelectorAll(".hero-slider .slide");
const heroPrev = document.querySelector(".hero-slider .prev");
const heroNext = document.querySelector(".hero-slider .next");
let currentSlide = 0, slideInterval;

function showHero(i){ heroSlides.forEach((s,idx)=> s.classList.toggle('active', idx===i)); }
function nextHero(){ currentSlide = (currentSlide+1) % heroSlides.length; showHero(currentSlide); }
function prevHero(){ currentSlide = (currentSlide-1 + heroSlides.length) % heroSlides.length; showHero(currentSlide); }

if (heroNext) heroNext.addEventListener('click', ()=>{ nextHero(); resetHeroInterval(); });
if (heroPrev) heroPrev.addEventListener('click', ()=>{ prevHero(); resetHeroInterval(); });

function startHeroInterval(){ if (heroSlides.length) slideInterval = setInterval(nextHero, 3500); }
function resetHeroInterval(){ clearInterval(slideInterval); startHeroInterval(); }
if (heroSlides.length) { showHero(0); startHeroInterval(); }

/* COLEÇÃO slider: usa scroll nativo + snap
   - arrows (desktop) fazem container.scrollBy(cardWidth)
   - mobile/tablet: user arrasta com o dedo; script faz snap-to-card após scroll
*/
document.querySelectorAll("[data-colecao]").forEach(slider => {
  const container = slider;                 // <div class="slider-colecao" ...>
  const inner = slider.querySelector(".colecao-inner");
  const boxes = Array.from(slider.querySelectorAll(".box"));
  const prev = slider.querySelector(".prev");
  const next = slider.querySelector(".next");

  // compute card width + gap (fallbacks included)
  function cardWidth(){
    const box = boxes[0];
    if(!box) return Math.round(window.innerWidth * 0.8);
    const rect = box.getBoundingClientRect();
    // gap: try computed style; if unavailable use var fallback
    let gap = 0;
    try {
      const g = getComputedStyle(inner).gap;
      gap = g ? parseFloat(g) : (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--colecao-gap')) || 20);
    } catch(e){ gap = 20; }
    return Math.round(rect.width + gap);
  }

  // arrows behaviour: scroll by one card width
  if (prev && next) {
    prev.addEventListener('click', ()=> container.scrollBy({ left: -cardWidth(), behavior: 'smooth' }));
    next.addEventListener('click', ()=> container.scrollBy({ left: cardWidth(), behavior: 'smooth' }));
  }

  // show/hide arrows according to breakpoint
  function updateControls(){
    if (prev && next) {
      if (window.innerWidth >= 1025) { prev.style.display = ''; next.style.display = ''; }
      else { prev.style.display = 'none'; next.style.display = 'none'; }
    }
  }
  updateControls();
  window.addEventListener('resize', updateControls);

  // Snap-to-card after user scroll finishes (debounced)
  let isScrolling;
  container.addEventListener('scroll', ()=>{
    if (isScrolling) clearTimeout(isScrolling);
    isScrolling = setTimeout(()=>{
      // compute target index based on card width
      const cw = cardWidth();
      const idx = Math.round(container.scrollLeft / cw);
      container.scrollTo({ left: idx * cw, behavior: 'smooth' });
    }, 120);
  }, { passive: true });

  // ensure initial snapping position on load
  window.addEventListener('load', ()=> {
    setTimeout(()=>{ container.scrollTo({ left: 0 }); }, 50);
  });
});

/* Menu hamburguer */
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav");
if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", ()=> navMenu.classList.toggle("active"));
  navMenu.querySelectorAll('a').forEach(a=> a.addEventListener('click', ()=> navMenu.classList.remove('active')));
}
