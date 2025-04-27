function fetchKnowledgeFromBhikitia(query) {
    const apiUrl = `https://bn.bhikitia.org/api.php?action=query&prop=extracts|pageimages&exintro&explaintext&piprop=thumbnail&pithumbsize=300&titles=${encodeURIComponent(query)}&format=json&origin=*`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const pages = data.query.pages;
            const page = Object.values(pages)[0];

            if (page && page.extract) {
                showKnowledgePanelAuto(page.title, page.extract, page.thumbnail ? page.thumbnail.source : null);
            } else {
                document.getElementById('knowledge-panel').style.display = 'none';
            }
        })
        .catch(error => {
            console.error('Error fetching from Bhikitia:', error);
            document.getElementById('knowledge-panel').style.display = 'none';
        });
}

function showKnowledgePanelAuto(title, extract, imageUrl) {
    const panelContainer = document.getElementById('knowledge-panel');

    panelContainer.innerHTML = `
        <div class="panel-card">
            ${imageUrl ? `<img src="${imageUrl}" alt="${title}" class="panel-image">` : ''}
            <h2 class="panel-title">${title}</h2>
            <p class="panel-description">${extract}</p>
            <a href="https://pro.bhikitia.org/wiki/${encodeURIComponent(title)}" target="_blank" class="panel-link">আরও জানুন</a>
        </div>
    `;
    panelContainer.style.display = 'block';
}

// When search happens
const urlParams = new URLSearchParams(window.location.search);
const queryParam = urlParams.get('query');
if (queryParam) {
    currentQuery = queryParam;
    searchResults(queryParam);
    fetchKnowledgeFromBhikitia(queryParam);
}
