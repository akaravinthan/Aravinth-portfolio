const menuBtn = document.querySelector('.hamburger');
const menuBar = document.querySelector('.menu-bar');
const menuList = document.querySelector('.nav-menu');

menuBtn.addEventListener('click', showMenu);

function showMenu(){
    menuBtn.classList.toggle('is-active');
    menuBar.classList.toggle('is-active');
    menuList.classList.toggle('is-active');
}

// Scroll-triggered slide-in animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('slide-in');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -100px 0px'
});

// Observe all sections
document.querySelectorAll('section, main, footer').forEach(element => {
  observer.observe(element);
});

// Fullscreen Modal Functionality
const fullscreenModal = document.getElementById('fullscreenModal');
const fullscreenContent = document.getElementById('fullscreenContent');
const closeFullscreenBtn = document.getElementById('closeFullscreen');

// Close fullscreen modal
closeFullscreenBtn.addEventListener('click', () => {
  fullscreenContent.classList.add('zoom-out');
  setTimeout(() => {
    fullscreenModal.classList.remove('active');
    fullscreenContent.classList.remove('zoom-out');
    fullscreenContent.innerHTML = '<button class="fullscreen-close" id="closeFullscreen">&times;</button>';
    document.getElementById('closeFullscreen').addEventListener('click', closeFullscreenModal);
  }, 500);
});

// Close on background click
fullscreenModal.addEventListener('click', (e) => {
  if (e.target === fullscreenModal) {
    fullscreenContent.classList.add('zoom-out');
    setTimeout(() => {
      fullscreenModal.classList.remove('active');
      fullscreenContent.classList.remove('zoom-out');
      fullscreenContent.innerHTML = '<button class="fullscreen-close" id="closeFullscreen">&times;</button>';
      document.getElementById('closeFullscreen').addEventListener('click', closeFullscreenModal);
    }, 500);
  }
});

function closeFullscreenModal() {
  fullscreenContent.classList.add('zoom-out');
  setTimeout(() => {
    fullscreenModal.classList.remove('active');
    fullscreenContent.classList.remove('zoom-out');
    fullscreenContent.innerHTML = '<button class="fullscreen-close" id="closeFullscreen">&times;</button>';
    document.getElementById('closeFullscreen').addEventListener('click', closeFullscreenModal);
  }, 500);
}

// Open fullscreen view
function openFullscreen(element) {
  fullscreenContent.classList.add('zoom-in');
  fullscreenContent.innerHTML = '<button class="fullscreen-close" id="closeFullscreen">&times;</button>' + element.innerHTML;
  fullscreenModal.classList.add('active');
  document.getElementById('closeFullscreen').addEventListener('click', closeFullscreenModal);
}

// Add zoom button to project cards
document.querySelectorAll('.project, .side-project, .info-card, .cert-card, .timeline-item').forEach((card) => {
  const zoomBtn = document.createElement('button');
  zoomBtn.className = 'zoom-btn';
  zoomBtn.textContent = 'View';
  zoomBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openFullscreen(card);
  });
  card.appendChild(zoomBtn);
});

// Close fullscreen with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && fullscreenModal.classList.contains('active')) {
    closeFullscreenModal();
  }
});
