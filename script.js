// ============================================================
//  Modern Image Slider — app.js
// ============================================================

const images = [
  { src: "1.jpg", label: "Nature · 1" },
  { src: "2.jpg", label: "Nature · 2" },
  { src: "3.jpg", label: "Nature · 3" },
  { src: "4.jpg", label: "Nature · 4" },
  { src: "5.jpg", label: "Nature · 5" },
];

// ── To use Unsplash demo images instead, replace above with:
// const images = [
//   { src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80", label: "Mountains · 1" },
//   { src: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80", label: "Forest · 2" },
//   { src: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=600&q=80", label: "Ocean · 3" },
//   { src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80", label: "Valley · 4" },
//   { src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80", label: "Sunlight · 5" },
// ];

let index = 0;
let playing = false;
let timer = null;

const slideImg = document.getElementById("slideImg");
const counter = document.getElementById("counter");
const imgLabel = document.getElementById("imgLabel");
const progressFill = document.getElementById("progressFill");
const playBtn = document.getElementById("playBtn");
const dotsEl = document.getElementById("dots");

// ── Build dot indicators ───────────────────────────────────
function buildDots() {
  dotsEl.innerHTML = "";
  images.forEach((_, i) => {
    const d = document.createElement("div");
    d.className = "dot" + (i === 0 ? " active" : "");
    d.addEventListener("click", () => goTo(i, i > index ? 1 : -1));
    dotsEl.appendChild(d);
  });
}

function updateDots() {
  document.querySelectorAll(".dot").forEach((d, i) => {
    d.classList.toggle("active", i === index);
  });
}

// ── Go to specific slide ───────────────────────────────────
function goTo(i, direction) {
  index = i;
  const anim = direction > 0 ? "animate-right" : "animate-left";

  // Reset animation
  slideImg.className = "slide";
  void slideImg.offsetWidth; // force reflow
  slideImg.src = images[index].src;
  slideImg.className = "slide " + anim;

  imgLabel.textContent = images[index].label;
  counter.textContent = index + 1 + " / " + images.length;
  progressFill.style.width = ((index + 1) / images.length) * 100 + "%";

  updateDots();
}

// ── Navigate prev / next ───────────────────────────────────
function go(direction) {
  let next = index + direction;
  if (next >= images.length) next = 0;
  if (next < 0) next = images.length - 1;
  goTo(next, direction);
}

// ── Play / Pause auto-slide ────────────────────────────────
function togglePlay() {
  playing = !playing;
  playBtn.innerHTML = playing ? "&#9646;&#9646;" : "&#9654;";

  if (playing) {
    timer = setInterval(() => go(1), 2800);
  } else {
    clearInterval(timer);
  }
}

// ── Keyboard navigation ────────────────────────────────────
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") go(1);
  if (e.key === "ArrowLeft") go(-1);
  if (e.key === " ") {
    e.preventDefault();
    togglePlay();
  }
});

// ── Init ───────────────────────────────────────────────────
buildDots();
slideImg.src = images[0].src;
slideImg.className = "slide animate-scale";
imgLabel.textContent = images[0].label;
progressFill.style.width = "20%";
