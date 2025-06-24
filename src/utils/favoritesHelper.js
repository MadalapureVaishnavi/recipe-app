// utils/favoritesHelper.js

const FAVORITES_KEY = 'favoriteRecipes';

export const getFavorites = () => {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
};

export const saveFavorites = (favorites) => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};

export const isFavorite = (videoId) => {
    const favorites = getFavorites();
    return favorites.some(fav => fav.videoId === videoId);
};

export const toggleFavorite = (video) => {
    let favorites = getFavorites();
    const exists = favorites.find(fav => fav.videoId === video.videoId);

    if (exists) {
        favorites = favorites.filter(fav => fav.videoId !== video.videoId);
    } else {
        favorites.push(video);
    }

    saveFavorites(favorites);
};
