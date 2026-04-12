const themeToggle = document.querySelector(".theme-toggle");
const promptForm = document.querySelector(".prompt-form");
const promptInput = document.querySelector(".prompt-input");
const promptBtn = document.querySelector(".prompt-btn");
const modelSelect = document.getElementById("model-select");
const countSelect = document.getElementById("count-select");
const ratioSelect = document.getElementById("ratio-select");
const gridGallery = document.querySelector(".gallery-grid");

const examplePrompts = [
  "A magic forest with glowing plants and fairy homes among giant mushrooms",
  "An old steampunk airship floating through golden clouds at sunset",
  "A future Mars colony with glass domes and gardens against red mountains",
  "A dragon sleeping on gold coins in a crystal cave",
  "An underwater kingdom with merpeople and glowing coral buildings",
  "A floating island with waterfalls pouring into clouds below",
  "A witch's cottage in fall with magic herbs in the garden",
  "A robot painting in a sunny studio with art supplies around it",
  "A magical library with floating glowing books and spiral staircases",
  "A Japanese shrine during cherry blossom season with lanterns and misty mountains",
  "A cosmic beach with glowing sand and an aurora in the night sky",
  "A medieval marketplace with colorful tents and street performers",
  "A cyberpunk city with neon signs and flying cars at night",
  "A peaceful bamboo forest with a hidden ancient temple",
  "A giant turtle carrying a village on its back in the ocean",
];

// Set theme based on saved preference or system default
(() => {
  const savedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;
  const isDarkTheme =
    savedTheme === "dark" || (!savedTheme && systemPrefersDark);
  document.body.classList.toggle("dark-theme", isDarkTheme);

  const icon = themeToggle?.querySelector("i");
  if (icon) {
    icon.className = isDarkTheme ? "fa-solid fa-sun" : "fa-solid fa-moon";
  }
})();

// Switch between light and dark themes
const toggleTheme = () => {
  const isDarkTheme = document.body.classList.toggle("dark-theme");
  localStorage.setItem("theme", isDarkTheme ? "dark" : "light");

  const icon = themeToggle?.querySelector("i");
  if (icon) {
    icon.className = isDarkTheme ? "fa-solid fa-sun" : "fa-solid fa-moon";
  }
};

// Calculate width/height based on chosen ratio
const getImageDimensions = (aspectRatio, baseSize = 512) => {
  const [ratioWidth, ratioHeight] = aspectRatio.split("/").map(Number);
  const scaleFactor = baseSize / Math.sqrt(ratioWidth * ratioHeight);

  let calculatedWidth = Math.round(ratioWidth * scaleFactor);
  let calculatedHeight = Math.round(ratioHeight * scaleFactor);

  // Ensure dimensions are multiples of 16
  calculatedWidth = Math.floor(calculatedWidth / 16) * 16;
  calculatedHeight = Math.floor(calculatedHeight / 16) * 16;

  return { width: calculatedWidth, height: calculatedHeight };
};

const updateImageCard = (index, imageUrl, errorMessage = "") => {
  const card = document.getElementById(`img-card-${index}`);
  if (!card) return;

  const img = card.querySelector(".result-img");
  const statusText = card.querySelector(".status-text");

  if (imageUrl) {
    img.src = imageUrl;
    img.style.display = "block";
    card.classList.remove("loading");
    card.classList.remove("error");
    statusText.textContent = "Done";

    // Wire up download button
    const downloadBtn = card.querySelector(".img-download-btn");
    if (downloadBtn) {
      downloadBtn.addEventListener("click", () => {
        const a = document.createElement("a");
        a.href = imageUrl;
        a.download = `ai-image-${index + 1}.jpg`;
        a.click();
      });
    }
  } else {
    card.classList.remove("loading");
    card.classList.add("error");
    statusText.textContent = errorMessage || "Failed to generate image";
  }
};

// Calls our backend — Pollinations AI does the rest for free
const generateImages = async (
  selectedModel,
  imageCount,
  aspectRatio,
  promptTxt,
) => {
  const { width, height } = getImageDimensions(aspectRatio);

  const imagePromises = Array.from({ length: imageCount }, async (_, i) => {
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: promptTxt,
          width,
          height,
          model: selectedModel,
        }),
      });

      if (!response.ok) {
        let errorMessage = "Generation failed";
        try {
          const errorData = await response.json();
          errorMessage = errorData?.error || errorMessage;
        } catch {
          errorMessage = `Server error: HTTP ${response.status}`;
        }
        throw new Error(errorMessage);
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      updateImageCard(i, imageUrl);
    } catch (error) {
      console.error(`Image ${i + 1} failed:`, error);
      updateImageCard(i, "", error.message);
    }
  });

  await Promise.allSettled(imagePromises);
};

const createImageCards = (
  selectedModel,
  imageCount,
  aspectRatio,
  promptTxt,
) => {
  gridGallery.innerHTML = "";

  for (let index = 0; index < imageCount; index++) {
    gridGallery.innerHTML += `
      <div class="img-card loading" id="img-card-${index}" style="aspect-ratio: ${aspectRatio}">
        <div class="status-container">
          <div class="spinner"></div>
          <i class="fa-solid fa-triangle-exclamation"></i>
          <p class="status-text">Generating...</p>
        </div>
        <img
          src=""
          alt="Generated image ${index + 1}"
          class="result-img"
          style="display: none;"
        />
        <div class="img-overlay">
          <button class="img-download-btn">
            <i class="fa-solid fa-download"></i>
          </button>
        </div>
      </div>
    `;
  }

  generateImages(selectedModel, imageCount, aspectRatio, promptTxt);
};

// Handle form submission
const handleFormSubmit = (e) => {
  e.preventDefault();

  const selectedModel = modelSelect.value;
  const imageCount = parseInt(countSelect.value, 10) || 1;
  const aspectRatio = ratioSelect.value || "1/1";
  const promptTxt = promptInput.value.trim();

  if (!selectedModel) {
    alert("Please select a style.");
    return;
  }
  if (!promptTxt) {
    alert("Please enter a prompt.");
    return;
  }

  createImageCards(selectedModel, imageCount, aspectRatio, promptTxt);
};

promptBtn.addEventListener("click", () => {
  const prompt =
    examplePrompts[Math.floor(Math.random() * examplePrompts.length)];
  promptInput.value = prompt;
  promptInput.focus();
});

promptForm.addEventListener("submit", handleFormSubmit);
themeToggle.addEventListener("click", toggleTheme);
