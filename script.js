// Shared functions for the MovieMatch application

/**
 * Fetches movie data from movies.json
 * @returns {Promise<Array>} Array of movie objects
 */
async function fetchMovies() {
    try {
        const response = await fetch('movies.json');
        if (!response.ok) {
            throw new Error('Failed to load movie data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching movies:', error);
        return [];
    }
}

/**
 * Filters movies based on user's preferred genres
 * @param {Array} movies - Array of all movies
 * @param {Array} preferredGenres - User's selected genres
 * @returns {Array} Filtered array of movies
 */
function filterMoviesByGenre(movies, preferredGenres) {
    if (!preferredGenres || preferredGenres.length === 0) {
        return movies;
    }
    return movies.filter(movie => preferredGenres.includes(movie.genre));
}

/**
 * Renders movie cards to the recommendations container
 * @param {Array} movies - Movies to display
 * @param {HTMLElement} container - DOM element to render into
 */
function renderMovieCards(movies, container) {
    container.innerHTML = ''; // Clear existing content

    if (movies.length === 0) {
        container.innerHTML = `
            <div class="col-span-3 text-center py-8">
                <p class="text-gray-400">No recommendations found. Try selecting more genres in your profile.</p>
            </div>
        `;
        return;
    }

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'bg-gray-800 rounded-lg overflow-hidden shadow-lg';
        movieCard.innerHTML = `
            <img src="${movie.image}" alt="${movie.title}" class="w-full h-48 object-cover">
            <div class="p-4">
                <h3 class="text-xl font-bold mb-2">${movie.title}</h3>
                <div class="flex justify-between items-center mb-2">
                    <span class="inline-block bg-purple-600 text-xs px-2 py-1 rounded-full">${movie.genre}</span>
                    <span class="text-yellow-400 text-sm">
                        ${'★'.repeat(Math.round(movie.rating))}${'☆'.repeat(5 - Math.round(movie.rating))}
                        ${movie.rating.toFixed(1)}
                    </span>
                </div>
                <p class="text-gray-300 text-sm mb-4">${movie.description}</p>
                <p class="text-gray-400 text-xs mb-3">Released: ${movie.year}</p>
                <button class="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 rounded transition">
                    View Details
                </button>
            </div>
        `;
        container.appendChild(movieCard);
    });
}

// Check authentication state on page load
document.addEventListener('DOMContentLoaded', function() {
    const protectedPages = ['profile.html', 'recommendations.html'];
    const currentPage = window.location.pathname.split('/').pop();
    
    if (protectedPages.includes(currentPage)) {
        const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
        if (!isLoggedIn) {
            window.location.href = 'login.html';
        }
    }
});

// Export functions for use in other files
export { fetchMovies, filterMoviesByGenre, renderMovieCards };