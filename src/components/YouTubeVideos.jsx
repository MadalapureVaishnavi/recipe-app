//AIzaSyAuJiMYD59l-LLHJGAHSJPEqT4k8rXtJfs



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import YouTubeRecipeCard from './YouTubeRecipeCard';
import './modals.css';

const API_KEY = 'AIzaSyAuJiMYD59l-LLHJGAHSJPEqT4k8rXtJfs'; // Use your own key

function YouTubeVideos({ query }) {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchVideos = async () => {
            if (!query) return;
            setLoading(true);

            try {
                const res = await axios.get('https://www.googleapis.com/youtube/v3/search', {
                    params: {
                        part: 'snippet',
                        q: `${query} recipe`,
                        type: 'video',
                        maxResults: 10,
                        key: API_KEY,
                        regionCode: 'IN',
                    },
                });

                setVideos(res.data.items);
            } catch (err) {
                console.error('YouTube API error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, [query]);

    return (
        <div className="video-section">
            <h3>🎬 Related YouTube Recipes</h3>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="video-grid">
                    {videos.map((video) => (
                        // ✅ Separate card for each video
                        <YouTubeRecipeCard key={video.id.videoId} video={video} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default YouTubeVideos;
