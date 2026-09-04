document.documentElement.classList.add('js');

const carouselSlides = [
  { src: '5.jpg', alt: 'Anteprima lavoro 1' },
  { src: '6.jpg', alt: 'Anteprima lavoro 2' },
  { src: '7.jpg', alt: 'Anteprima lavoro 3' }
];
let currentSlideIndex = 0;

const elements = {
  menuToggle: document.getElementById('menuToggle'),
  mobileMenu: document.getElementById('mobileMenu'),
  backToTop: document.getElementById('backToTop'),
  carouselSlide: document.querySelector('.carousel-slide'),
  carouselPrev: document.querySelector('.carousel-prev'),
  carouselNext: document.querySelector('.carousel-next'),
  carouselStatus: document.querySelector('.carousel-status'),
  navLinks: document.querySelectorAll('.nav-right a[href^="#"]'),
  sections: document.querySelectorAll('.js-reveal'),
  spySections: document.querySelectorAll('#about, #skills, #projects, #experience, #app-demo, #servizi, #contact'),
  videos: document.querySelectorAll('video')
};

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function setMenuOpen(isOpen) {
  elements.mobileMenu.classList.toggle('show', isOpen);
  elements.menuToggle.setAttribute('aria-expanded', String(isOpen));
  elements.menuToggle.setAttribute(
    'aria-label',
    isOpen ? 'Chiudi menu di navigazione' : 'Apri menu di navigazione'
  );
}

elements.navLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#dashboard') return;

    const targetSection = document.querySelector(targetId);
    if (!targetSection) return;

    e.preventDefault();

    const headerOffset = 80;
    const elementPosition = targetSection.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    });

    elements.navLinks.forEach(navLink => navLink.classList.remove('active'));
    this.classList.add('active');
    setMenuOpen(false);
  });
});

if (!prefersReducedMotion && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.sections.forEach(section => observer.observe(section));
} else {
  elements.sections.forEach(section => section.classList.add('is-visible'));
}

let scrollTimeout;
window.addEventListener('scroll', () => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    elements.backToTop.classList.toggle('is-visible', window.pageYOffset > 300);

    let currentId = '';
    elements.spySections.forEach(section => {
      const top = section.getBoundingClientRect().top;
      if (top <= 120) currentId = section.id;
    });

    if (currentId) {
      elements.navLinks.forEach(link => {
        const href = link.getAttribute('href');
        link.classList.toggle('active', href === '#' + currentId);
      });
    }
  }, 80);
}, { passive: true });

elements.backToTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: prefersReducedMotion ? 'auto' : 'smooth'
  });
});

elements.menuToggle.addEventListener('click', () => {
  const willOpen = !elements.mobileMenu.classList.contains('show');
  setMenuOpen(willOpen);
});

document.addEventListener('click', (e) => {
  if (
    !elements.menuToggle.contains(e.target) &&
    !elements.mobileMenu.contains(e.target) &&
    elements.mobileMenu.classList.contains('show')
  ) {
    setMenuOpen(false);
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && elements.mobileMenu.classList.contains('show')) {
    setMenuOpen(false);
    elements.menuToggle.focus();
  }
});

function updateCarousel(index) {
  if (!elements.carouselSlide || !carouselSlides[index]) return;

  elements.carouselSlide.style.opacity = '0';

  setTimeout(() => {
    elements.carouselSlide.src = carouselSlides[index].src;
    elements.carouselSlide.alt = carouselSlides[index].alt;
    elements.carouselSlide.style.opacity = '1';
    if (elements.carouselStatus) {
      elements.carouselStatus.textContent = (index + 1) + ' / ' + carouselSlides.length;
    }
  }, prefersReducedMotion ? 0 : 180);
}

function goToSlide(delta) {
  currentSlideIndex = (currentSlideIndex + delta + carouselSlides.length) % carouselSlides.length;
  updateCarousel(currentSlideIndex);
}

if (elements.carouselNext) {
  elements.carouselNext.addEventListener('click', () => goToSlide(1));
}

if (elements.carouselPrev) {
  elements.carouselPrev.addEventListener('click', () => goToSlide(-1));
}

document.addEventListener('keydown', (e) => {
  const carousel = document.querySelector('.carousel-container');
  if (!carousel) return;
  const rect = carousel.getBoundingClientRect();
  const inView = rect.top < window.innerHeight && rect.bottom > 0;
  if (!inView) return;
  if (e.key === 'ArrowRight') goToSlide(1);
  if (e.key === 'ArrowLeft') goToSlide(-1);
});

carouselSlides.forEach(item => {
  const img = new Image();
  img.src = item.src;
});

if (elements.carouselSlide) {
  updateCarousel(currentSlideIndex);
}

if (prefersReducedMotion) {
  elements.videos.forEach(video => {
    video.pause();
    video.removeAttribute('autoplay');
  });
}
// Services Gallery Lightbox
const servicesGalleryItems = document.querySelectorAll(
  '.services-gallery-item'
);

const servicesLightbox = document.getElementById('servicesLightbox');
const servicesLightboxImage = document.getElementById(
  'servicesLightboxImage'
);
const servicesLightboxClose = document.getElementById(
  'servicesLightboxClose'
);

if (servicesLightbox && servicesLightboxImage && servicesLightboxClose) {
  const closeServicesLightbox = () => {
    servicesLightbox.classList.remove('show');
    servicesLightboxImage.src = '';
    document.body.style.overflow = '';
  };

  servicesGalleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      servicesLightboxImage.src = item.dataset.image;
      servicesLightboxImage.alt = item.dataset.alt || '';

      servicesLightbox.classList.add('show');
      document.body.style.overflow = 'hidden';
    });
  });

  servicesLightboxClose.addEventListener('click', closeServicesLightbox);

  servicesLightbox.addEventListener('click', (event) => {
    if (event.target === servicesLightbox) {
      closeServicesLightbox();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && servicesLightbox.classList.contains('show')) {
      closeServicesLightbox();
    }
  });
}
