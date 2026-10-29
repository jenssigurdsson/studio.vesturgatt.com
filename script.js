// Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const items = document.querySelectorAll('.item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;
    location.hash = filter === 'all' ? '' : filter;
    applyFilter(filter);
  });
});

// Apply filter function
function applyFilter(filter) {
  filterBtns.forEach(b => b.classList.toggle('active', b.dataset.filter === filter));
  items.forEach(item => {
    const cat = item.dataset.category;
    const show = filter === 'all' ? cat !== 'gursky' : cat === filter;
    item.classList.toggle('hidden', !show);
  });
}

// Init: read hash or default to "all"
const initFilter = location.hash.replace('#', '') || 'all';
applyFilter(initFilter);

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxTag = document.getElementById('lightbox-tag');
const lightboxClose = document.getElementById('lightbox-close');

items.forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    const title = item.querySelector('.item-title').textContent;
    const tag = item.querySelector('.item-tag').textContent;

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxTitle.textContent = title;
    lightboxTag.textContent = tag;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});
