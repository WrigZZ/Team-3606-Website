const img = document.getElementById('slide-img');
const title = document.getElementById('slide-title');
const counter = document.getElementById('slide-counter');

const slides = [
  { title: "Working on the Robot at Competition 1", src: "Gallery/2026/2026WorkComp1.jpeg" },
  { title: "Working on the Robot at Competition 2", src: "Gallery/2026/2026WorkComp2.jpeg" },
];

let cur = 0;

function go(n) {
  cur = (n + slides.length) % slides.length;
  img.src = slides[cur].src;
  title.textContent = slides[cur].title;
  counter.textContent = `${cur + 1} / ${slides.length}`;
}

document.getElementById('prev').onclick = () => go(cur - 1);
document.getElementById('next').onclick = () => go(cur + 1);