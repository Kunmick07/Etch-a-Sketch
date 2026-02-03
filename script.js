const container = document.getElementById("container");
const resizeBtn = document.getElementById("resizeBtn");
const blackBtn = document.getElementById("blackBtn");
const randomBtn = document.getElementById("randomBtn");
const eraserBtn = document.getElementById("eraserBtn");

let currentMode = "black"; // black | random | eraser

// Create the grid
function createGrid(size) {
  container.innerHTML = "";

  const squareSize = 960 / size;

  for (let i = 0; i < size * size; i++) {
    const square = document.createElement("div");
    square.classList.add("square");

    square.style.width = `${squareSize}px`;
    square.style.height = `${squareSize}px`;

    square.addEventListener("mouseover", () => {
      applyColor(square);
    });

    container.appendChild(square);
  }
}

// Apply color based on current mode
function applyColor(square) {
  if (currentMode === "black") {
    square.style.backgroundColor = "black";
    return;
  }

  if (currentMode === "eraser") {
    square.style.backgroundColor = "white";
    square.dataset.darkness = "";
    return;
  }

  // RANDOM COLOR + PROGRESSIVE DARKENING
  if (currentMode === "random") {

    // First interaction → assign random color
    if (!square.dataset.darkness) {
      square.dataset.darkness = 0;

      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);

      square.dataset.r = r;
      square.dataset.g = g;
      square.dataset.b = b;
    }

    let darkness = Number(square.dataset.darkness);

    if (darkness < 100) {
      darkness += 10;
      square.dataset.darkness = darkness;
    }

    const r = square.dataset.r * (1 - darkness / 100);
    const g = square.dataset.g * (1 - darkness / 100);
    const b = square.dataset.b * (1 - darkness / 100);

    square.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
  }
}

// Button events
blackBtn.addEventListener("click", () => {
  currentMode = "black";
});

randomBtn.addEventListener("click", () => {
  currentMode = "random";
});

eraserBtn.addEventListener("click", () => {
  currentMode = "eraser";
});

resizeBtn.addEventListener("click", () => {
  let size = prompt("Enter number of squares per side (max 100):");
  size = Number(size);

  if (size > 0 && size <= 100) {
    createGrid(size);
  } else {
    alert("Please enter a number between 1 and 100");
  }
});

// Default grid
createGrid(16);


