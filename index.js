const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

// TikTok links 
const tiktokVideos = [ { url: "https://vt.tiktok.com/ZSkNAnL4o/" }, 
{ url: "https://vt.tiktok.com/ZSkNDuwVp/" }, 
{ url: "https://vt.tiktok.com/ZSkNDrwYg/" }, 
{ url: "https://vt.tiktok.com/ZSkNDkEue/" }, 
{ url: "https://vt.tiktok.com/ZSkNAvdBP/" }, 
{ url: "https://vt.tiktok.com/ZSkNAbcXw/" }, 
{ url: "https://vt.tiktok.com/ZSkNAcryA/" }, 
{ url: "https://vt.tiktok.com/ZSkNAVYSk/" }, 
{ url: "https://vt.tiktok.com/ZSkNA44hX/" }, 
{ url: "https://vt.tiktok.com/ZSkNAtQb6/" }, 
{ url: "https://vt.tiktok.com/ZSkNAcVvy/" }, 
{ url: "https://vt.tiktok.com/ZSkNAsfWb/" }, 
{ url: "https://vt.tiktok.com/ZSkNAt2td/" }, 
{ url: "https://vt.tiktok.com/ZSkNAVctr/" }, 
{ url: "https://vt.tiktok.com/ZSkNAcYTQ/" }, 
{ url: "https://vt.tiktok.com/ZSkNAGCJ5/" }, 
{ url: "https://vt.tiktok.com/ZSkNDA9X6/" }, 
{ url: "https://vt.tiktok.com/ZSkND5bnn/" }, 
{ url: "https://vt.tiktok.com/ZSkNDLvR1/" }, 
{ url: "https://vt.tiktok.com/ZSkNDFGfM/" }, 
{ url: "https://vt.tiktok.com/ZSkNDmHQe/" }, 
{ url: "https://vt.tiktok.com/ZSkNDUsKK/" }, 
{ url: "https://vt.tiktok.com/ZSkND5re3/" }, 
{ url: "https://vt.tiktok.com/ZSkNDabxf/" }, 
{ url: "https://vt.tiktok.com/ZSkNDayQW/" }, 
{ url: "https://vt.tiktok.com/ZSkNDjbR2/" }, 
{ url: "https://vt.tiktok.com/ZSkNDRjHf/" }, 
];
app.get("/tikrandom", async (req, res) => {
  try {
    const random = tiktokVideos[Math.floor(Math.random() * tiktokVideos.length)];
    const videoUrl = random.url;

    const encodedURL = encodeURIComponent(videoUrl);
    const apiURL = `https://www.tikwm.com/api/?url=${encodedURL}`;

    const response = await axios.get(apiURL, {
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    });

    const data = response.data;

    if (!data.data || !data.data.play) {
      return res.status(500).json({ error: "Failed to fetch no watermark video" });
    }

    return res.json({
      url: data.data.play,
      desc: random.desc,
      title: data.data.title || "TikTok clip"
    });

  } catch (err) {
    console.error("❌ API error:", err.message);
    return res.status(500).json({ error: "Failed to fetch no watermark video" });
  }
});

app.get("/", (req, res) => {
  res.send("🎥 Welcome to ML Funny TikTok Random Video API with no watermark (Tikwm)!");
});

app.listen(PORT, () => {
  console.log(`🚀 API running on port ${PORT}`);
});
