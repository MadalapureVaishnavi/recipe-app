// src/utils/youtubeApi.js
import axios from "axios";

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

export async function fetchYouTubeVideos(query) {
    if (!query) return [];

    try {
        const res = await axios.get("https://www.googleapis.com/youtube/v3/search", {
            params: {
                part: "snippet",
                q: `${query} recipe`,
                type: "video",
                maxResults: 10,
                key: API_KEY,
                regionCode: "IN",
            },
        });
        return res.data.items;
    } catch (err) {
        console.error("YouTube API error:", err);
        return [];
    }
}
