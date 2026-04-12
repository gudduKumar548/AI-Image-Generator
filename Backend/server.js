const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, "public")));

// Image generation route using Pollinations AI (free, no API key needed)
app.post("/api/generate", async (req, res) => {
  const { prompt, width, height, model } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Missing prompt" });
  }

  try {
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=${width}&height=${height}&model=${model || "flux"}&nologo=true&nofeed=true`;

    console.log(`Generating image: ${url}`);

    const imageResponse = await axios.get(url, {
      responseType: "arraybuffer",
      timeout: 60000,
    });

    res.set("Content-Type", "image/jpeg");
    res.send(imageResponse.data);
  } catch (error) {
    console.error("Pollinations error:", error.message);
    res.status(500).json({ error: error.message || "Image generation failed" });
  }
});

// Fallback: serve index.html — Express v5 requires named wildcard
app.get("/{*path}", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
