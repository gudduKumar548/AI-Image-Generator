# 🪄 AI Image Generator

**Transform your imagination into stunning visuals with AI**

[![MIT License](https://img.shields.io/badge/License-MIT-purple.svg)](https://github.com/gudduKumar548/AI-Image-Generator/blob/main/Backend/LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)](https://expressjs.com)
[![Pollinations AI](https://img.shields.io/badge/Powered%20by-Pollinations%20AI-blueviolet)](https://pollinations.ai)
[![Free](https://img.shields.io/badge/API-Free%20%26%20No%20Key%20Required-brightgreen)]()

---

## 🌟 Overview

A full-stack AI image generation web app, Where a user Just type a prompt, pick a style and aspect ratio, and watch your imagination come to life — completely **free**, no API key required.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎨 **Text to Image** | Generate images from any text prompt |
| 🖼️ **Multiple Styles** | Flux, Flux Realism, Flux Anime, Flux 3D, Turbo |
| 📐 **Aspect Ratios** | Square (1:1), Landscape (16:9), Portrait (9:16) |
| 🔢 **Batch Generation** | Generate up to 4 images at once |
| 🎲 **Random Prompts** | Get inspired with random example prompts |
| 🌙 **Theme Toggle** | Switch between dark and light mode |
| 💾 **Download Images** | Save your generated images instantly |
| 🔒 **Secure Backend** | API calls never exposed to the browser |
| 💸 **100% Free** | No API key, no credits, no signup needed |

---

## 🛠️ Tech Stack

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)

---

## 📁 Project Structure

```
Backend/
├── 📂 public/
│   ├── 🌐 index.html      # Frontend UI
│   ├── 🎨 style.css       # Styles & animations
│   └── ⚙️  app.js          # Frontend logic
├── 🖥️  server.js           # Express backend & API proxy
├── 📦 package.json
├── 🚀 vercel.json         # Vercel deployment config
├── 📄 LICENSE
└── 🔒 .gitignore
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org) installed on your machine

### Installation

**1. Clone the repo:**
```bash
git clone https://github.com/gudduKumar548/AI-Image-Generator.git
```

**2. Go into the Backend folder:**
```bash
cd AI-Image-Generator/Backend
```

**3. Install dependencies:**
```bash
npm install
```

**4. Start the server:**
```bash
npm start
```

**5. Open your browser:**
```
http://localhost:3000
```

> ✅ No `.env` file or API key needed — just install and run!

---

## 🌐 How It Works

```
User types prompt
      ↓
Frontend (app.js)
      ↓
POST /api/generate
      ↓
Express Server (server.js)
      ↓
Pollinations AI API
      ↓
Image returned to browser
```

The API call happens on the **server side** — keeping things clean and secure.

---

## 🎨 Available Styles

| Style | Best For |
|---|---|
| **Flux** | General purpose, high quality |
| **Flux Realism** | Photorealistic images |
| **Flux Anime** | Anime & illustration style |
| **Flux 3D** | 3D rendered visuals |
| **Turbo** | Fast generation |

---

## 🙏 Credits

- [Pollinations AI](https://pollinations.ai) — Free image generation API
- [Font Awesome](https://fontawesome.com) — Icons
- [Google Fonts](https://fonts.google.com) — Inter font

---

## 📄 License

This project is licensed under the **[MIT License](https://github.com/gudduKumar548/AI-Image-Generator/blob/main/Backend/LICENSE)**

Copyright © 2026 **Guddu Kumar**

---

⭐ **If you found this project helpful, please give it a star!** ⭐
