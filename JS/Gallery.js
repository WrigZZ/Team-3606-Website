// ==================== YEAR DATA ====================
// Each entry is one year card on the gallery grid.
// - year:        shown as the card title
// - description: shown as the card subtitle
// - cover:       the image shown on the grid card itself
// - slides:      array of { title, src } shown in the slideshow when the card is clicked
//
// To add a new year: add a new object to the top of this array.
// To add photos to a year: add { title: "...", src: "..." } entries to that year's slides array.

const years = [
  {
    year: "2026",
    description: "REBUILT presented by Haas",
    cover: "/Gallery/2026/2026Bot1.jpg",
    slides: [
      { title: "Working on the Robot at 2026 Competition 1", src: "/Gallery/2026/2026WorkComp1.jpg" },
      { title: "Working on the Robot at 2026 Competition 2", src: "/Gallery/2026/2026WorkComp2.jpg" },
      { title: "Working on the Robot at 2026 Competition 3", src: "/Gallery/2026/2026WorkComp3.jpg" },
      { title: "Working on the Robot at 2026 Competition 4", src: "/Gallery/2026/2026WorkComp4.jpg" },
      { title: "Working on the Robot at 2026 Competition 5", src: "/Gallery/2026/2026WorkComp5.jpg" },
      { title: "Working on the 2026 Robot", src: "/Gallery/2026/2026WorkHome.jpg" },
      { title: "2026 FRC Team 1", src: "/Gallery/2026/2026Team1.jpg" },
      { title: "2026 FRC Team 2", src: "/Gallery/2026/2026Team2.jpg" },
      { title: "2026 Rebuilt Match", src: "/Gallery/2026/2026Play.jpg" },
      { title: "2026 Bumpers", src: "/Gallery/2026/2026Bumpers.jpg" },
      { title: "2026 Bot 1", src: "/Gallery/2026/2026Bot1.jpg" },
      { title: "2026 Bot 2", src: "/Gallery/2026/2026Bot2.jpg" },
    ]
  },
  // Add more years - Newest on top
  {
    year: "2025",
    description: "REEFSCAPE presented by Haas",
    cover: "/Gallery/2025/2025Bot.jpg",
    slides: [
      { title: "2025 Reefscape Team", src: "/Gallery/2025/2025Team.jpg" },
      { title: "2025 Bot", src: "/Gallery/2025/2025Bot.jpg" },
      { title: "Working on the Robot at 2025 Competition 1", src: "/Gallery/2025/2025Comp1.jpg" },
      { title: "Working on the Robot at 2025 Competition 2", src: "/Gallery/2025/2025Comp2.jpg" },
      { title: "Working on the Robot at 2025 Competition 3", src: "/Gallery/2025/2025Comp3.jpg" },
    ]
  },
  {
    year: "2024",
    description: "Crescendo presented by Haas",
    cover: "/Gallery/2024/2024Bot.jpg",
    slides: [
      { title: "2024 Bot", src: "/Gallery/2024/2024Bot.jpg" },
      { title: "Testing the robot 2024", src: "/Gallery/2024/2024TestDrive.jpg" },
    ]
  },
];

// ==================== GRID ====================

const grid = document.getElementById('year-grid');

// Build a card for each year and append it to the grid
years.forEach((yearData, index) => {
  const card = document.createElement('div');
  card.className = 'year-card';

  card.innerHTML = `
    <div class="year-card-img-wrap">
      <img class="year-cover" src="${yearData.cover}" alt="${yearData.year} season photo">
      <div class="year-card-overlay">
        <span class="year-card-view">View Photos ›</span>
      </div>
    </div>
    <div class="year-card-info">
      <p class="year-title">${yearData.year}</p>
      <p class="year-desc">${yearData.description}</p>
      <p class="year-count">${yearData.slides.length} photo${yearData.slides.length !== 1 ? 's' : ''}</p>
    </div>
  `;

  // Clicking the card opens the modal slideshow for this year
  card.addEventListener('click', () => openModal(index));

  grid.appendChild(card);
});

// ==================== MODAL SLIDESHOW ====================

const modal = document.getElementById('slideshow-modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalYear = document.getElementById('modal-year');
const modalCount = document.getElementById('modal-counter');
const closeBtn = document.getElementById('modal-close');
const prevBtn = document.getElementById('modal-prev');
const nextBtn = document.getElementById('modal-next');

let activeSlides = [];  // slides array for the currently open year
let cur = 0;   // current slide index

// openModal loads the slides for the clicked year and shows the modal
function openModal(yearIndex) {
  const yearData = years[yearIndex];
  activeSlides = yearData.slides;
  cur = 0;

  modalYear.textContent = yearData.year + ' Season';
  modal.classList.add('open');
  document.body.style.overflow = 'hidden'; // prevent background scroll

  renderSlide();
}

// renderSlide updates the image, caption and counter for the current slide
function renderSlide() {
  const slide = activeSlides[cur];
  modalImg.src = slide.src;
  modalImg.alt = slide.title;
  modalTitle.textContent = slide.title;
  modalCount.textContent = `${cur + 1} / ${activeSlides.length}`;
}

// go() advances to slide index n, wrapping around at both ends
function go(n) {
  cur = (n + activeSlides.length) % activeSlides.length;
  renderSlide();
}

prevBtn.onclick = () => go(cur - 1);
nextBtn.onclick = () => go(cur + 1);

// Close the modal
function closeModal() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
  modalImg.src = ''; // release the image so it doesn't linger in memory
}

closeBtn.onclick = closeModal;

// Click the dark backdrop (outside the modal box) to close
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

// Arrow key navigation while the modal is open
document.addEventListener('keydown', (e) => {
  if (!modal.classList.contains('open')) return;
  if (e.key === 'ArrowLeft') go(cur - 1);
  if (e.key === 'ArrowRight') go(cur + 1);
  if (e.key === 'Escape') closeModal();
});