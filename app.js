let images = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"];
let index = 0;
document.getElementById("slider").src = images[index];

function nextImage() {
  index++;
  while (index >= images.length) {
    index = 0;
  }
  document.getElementById("slider").src = images[index]
}
