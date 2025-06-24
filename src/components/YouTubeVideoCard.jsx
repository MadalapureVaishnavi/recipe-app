import React from 'react';
import './modals.css';

function YouTubeVideoCard({ video }) {
    const { videoId } = video.id;
    const { title, channelTitle } = video.snippet;

    return (
        <div className="video-card">
            <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title={title}
                width="100%"
                height="200"
                frameBorder="0"
                allowFullScreen
            ></iframe>
            <div className="video-info">
                <h4>{title}</h4>
                <p>📺 {channelTitle}</p>
            </div>
        </div>
    );
}

export default YouTubeVideoCard;
