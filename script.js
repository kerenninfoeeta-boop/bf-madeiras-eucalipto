const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');
const progress = document.querySelector('.reading-progress span');
const scrollTopButton = document.querySelector('.scroll-top');

toggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', isOpen);
});

document.querySelectorAll('.nav a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}));

const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); }
}), { threshold: 0.14 });
document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((element) => revealObserver.observe(element));

const sectionObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (!entry.isIntersecting) return;
  document.querySelectorAll('.nav a:not(.nav-cta)').forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
}), { rootMargin: '-35% 0px -55% 0px' });
document.querySelectorAll('main section[id]').forEach((section) => sectionObserver.observe(section));

function updateScrollUI() { const max = document.documentElement.scrollHeight - window.innerHeight; progress.style.transform = `scaleX(${max ? window.scrollY / max : 0})`; header.classList.toggle('scrolled', window.scrollY > 18); scrollTopButton.classList.toggle('visible', window.scrollY > 550); }
window.addEventListener('scroll', updateScrollUI, { passive: true }); updateScrollUI();
scrollTopButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

const productData = { mouroes: ['Mourões', 'Peças para quem procura resistência e firmeza em cercas e divisões.', 'Cercas e divisões'], vigas: ['Vigas e peças', 'Uma base confiável para compor estruturas e diferentes projetos.', 'Estruturas e projetos'], toras: ['Toras de eucalipto', 'Madeira natural e versátil para aplicações que pedem a força do eucalipto.', 'Diversos usos'] };
const productModal = document.querySelector('.product-modal');
function openProduct(card) { const product = productData[card.dataset.product]; document.querySelector('#modal-title').textContent = product[0]; document.querySelector('#modal-description').textContent = product[1]; document.querySelector('#modal-uses').textContent = product[2]; productModal.showModal(); }
document.querySelectorAll('.product-card[data-product]').forEach((card) => { card.addEventListener('click', () => openProduct(card)); card.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openProduct(card); } }); });
const videoModal = document.querySelector('.video-modal');
const videoButton = document.querySelector('[data-video-open]');
if (videoButton) videoButton.addEventListener('click', () => videoModal.showModal());
document.querySelectorAll('.modal-close').forEach((button) => button.addEventListener('click', () => button.closest('dialog').close()));
document.querySelectorAll('dialog').forEach((modal) => modal.addEventListener('click', (event) => { if (event.target === modal) modal.close(); }));
