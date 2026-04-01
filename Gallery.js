// Grab the slideshow elements from the HTML by their IDs

const img = document.getElementById('slide-img');
// "slide-img" is the <img> element that displays the current slide photo

const title = document.getElementById('slide-title');
// "slide-title" is the element that displays the caption/title of the current slide

const counter = document.getElementById('slide-counter');
// "slide-counter" is the element that displays "1 / 14" style progress text


// slides is the array of all photos in the slideshow
// Each object has a title (caption) and src (path to the image file)
// To add a new photo: add a new { title: "...", src: "..." } entry to this array
// To remove a photo: delete its entry from this array
const slides = [
  { title: "Working on the Robot at 2026 Competition 1", src: "Gallery/2026/2026WorkComp1.jpeg" },
  { title: "Working on the Robot at 2026 Competition 2", src: "Gallery/2026/2026WorkComp2.jpeg" },
  { title: "Working on the Robot at 2026 Competition 3", src: "Gallery/2026/2026WorkComp3.jpeg" },
  { title: "Working on the Robot at 2026 Competition 4", src: "Gallery/2026/2026WorkComp4.jpeg" },
  { title: "Working on the Robot at 2026 Competition 5", src: "Gallery/2026/2026WorkComp5.jpeg" },
  { title: "Working on the 2026 Robot", src: "Gallery/2026/2026WorkHome.jpeg" },
  { title: "2026 FRC Team 1", src: "Gallery/2026/2026Team1.jpeg" },
  { title: "2026 FRC Team 2", src: "Gallery/2026/2026Team2.jpeg" },
  { title: "2026 Rebuilt Match", src: "Gallery/2026/2026Play.jpeg" },
  { title: "2026 Chassis", src: "Gallery/2026/2026Chassis.jpg" },
  { title: "2026 Bumpers", src: "Gallery/2026/2026Bumpers.jpeg" },
  { title: "2026 Bot 1", src: "Gallery/2026/2026Bot1.jpeg" },
  { title: "2026 Bot 2", src: "Gallery/2026/2026Bot2.jpeg" },
  { title: "2026 Bot 3", src: "Gallery/2026/2026Bot3.jpeg" },
];

// cur tracks the index of the currently displayed slide (starts at 0 = first slide)
let cur = 0;

// go() is the function that switches the slideshow to a specific slide by index (n)
function go(n) {
  cur = (n + slides.length) % slides.length;
  // The modulo (%) wraps around — if you go past the last slide it loops back to the first,
  // and if you go before the first slide it loops back to the last

  img.src = slides[cur].src;
  // Updates the image to the src path of the new current slide

  title.textContent = slides[cur].title;
  // Updates the caption text to the title of the new current slide

  counter.textContent = `${cur + 1} / ${slides.length}`;
  // Updates the counter text, e.g. "3 / 14"
  // cur + 1 because arrays start at 0 but we want to show "1" for the first slide
}

// When the prev button is clicked, go to the previous slide (cur - 1)
document.getElementById('prev').onclick = () => go(cur - 1);

// When the next button is clicked, go to the next slide (cur + 1)
document.getElementById('next').onclick = () => go(cur + 1);