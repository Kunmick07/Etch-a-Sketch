const container = document.getElementById("container");
const resizeBtn = document.getElementById("resizeBtn");
const blackBtn = document.getElementById("blackBtn");
const randomBtn = document.getElementById("randomBtn");
const eraserBtn = document.getElementById("eraserBtn");

let currentMode = "black"; // black | random | eraser

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

function applyColor(square) {
  if (currentMode === "black") {
    square.style.backgroundColor = "black";
  }

  if (currentMode === "random") {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    square.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
  }

  if (currentMode === "eraser") {
    square.style.backgroundColor = "white";
  }
}

// button event listeners
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
    alert("Enter a number between 1 and 100");
  }
});

// default grid
createGrid(16);

