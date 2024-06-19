document.addEventListener('DOMContentLoaded', () => {
    const regionSelector = document.getElementById('regionSelector');
    const categorySelector = document.getElementById('categorySelector');
    const newsContainer = document.getElementById('newsContainer');

    const API_KEY = '4d057832f4124a38ada745d8a470b29a'; // Your provided API key
    const API_URL = 'https://newsapi.org/v2/top-headlines';

    function fetchNews(region = '', category = 'general') {
        const url = `${API_URL}?country=${region}&category=${category}&apiKey=${API_KEY}`;
        console.log(`Fetching news from: ${url}`); // Log the URL for debugging
        showLoadingIndicator();
        fetch(url)
            .then(response => {
                console.log(`Response status: ${response.status}`); // Log response status
                if (!response.ok) {
                    return response.json().then(err => {
                        throw new Error(`HTTP error! status: ${response.status}, message: ${err.message}`);
                    });
                }
                return response.json();
            })
            .then(data => {
                if (data.status === "error") {
                    throw new Error(data.message);
                }
                displayNews(data.articles);
            })
            .catch(error => showError(error));
    }

    function displayNews(articles) {
        newsContainer.innerHTML = '';
        articles.forEach(article => {
            const newsCard = document.createElement('div');
            newsCard.className = 'news-card';
            newsCard.innerHTML = `
                <h2>${article.title}</h2>
                <p>${article.description}</p>
                <a href="${article.url}" target="_blank">Read more</a>
            `;
            newsContainer.appendChild(newsCard);
        });
        hideLoadingIndicator();
    }

    function showLoadingIndicator() {
        newsContainer.innerHTML = '<p>Loading...</p>';
    }

    function hideLoadingIndicator() {
        // You can add any additional logic if needed when hiding the loading indicator
    }

    function showError(error) {
        newsContainer.innerHTML = `<p>Error fetching news: ${error.message}</p>`;
        console.error('Error fetching news:', error);
    }

    regionSelector.addEventListener('change', () => {
        const region = regionSelector.value === 'world' ? '' : regionSelector.value;
        fetchNews(region, categorySelector.value);
    });

    categorySelector.addEventListener('change', () => {
        const region = regionSelector.value === 'world' ? '' : regionSelector.value;
        fetchNews(region, categorySelector.value);
    });

    // Initial fetch
    fetchNews();
});
