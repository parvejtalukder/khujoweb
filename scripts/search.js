
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query'); // Corrected parameter name

    const input = document.getElementById('searchInput');

    if (query) {
        input.placeholder = query;
    }
};

// ... (Your JavaScript code from the provided snippet) ...
// Define a list of Bengali bad words (updated with additional offensive words)
const badWords = [
// 🟥 বাংলা অশ্লীল শব্দ
'গালি', 'অশ্লীল', 'নফরৎ', 'ধর্ষণ', 'মাদক', 'হিংসা', 'অনৈতিক', 'জঘন্য',
'সেক্স', 'চুদাচুদি', 'ব্যাভিচার', 'পর্ণ', 'নগ্ন', 'হস্তমৈথুন', 'পতিতা', 'পতিতালয়',
'বেলেল্লাপনা', 'অশ্লীলতা', 'প্রাপ্তবয়স্ক', 'বিতৃষ্ণা', 'নোংরা', 'অসৎ', 'লম্পট',
'নগ্নতা', 'যৌনতা', 'পতিবেশিনী', 'বালিকা যৌন', 'পরকীয়া', 'রতিক্রিয়া', 'উলঙ্গ',

// 🟩 ইংরেজি অশ্লীল শব্দ
'sex', 'hot sex', 'sexy', 'porn', 'nude', 'masturbate', 'escort', 'hooker', 
'stripper', 'orgasm', 'hardcore', 'x-rated', 'explicit', 'adult', 'hentai',
'xxx', 'vibrator', 'bdsm', 'gangbang', 'milf', 'cum', 'ejaculate', 'penetration',
'blowjob', 'boobs', 'tits', 'pussy', 'cock', 'dildo', 'fetish', 'erotic', 
'incest', 'anal', 'voyeur', 'taboo', 'camgirl', 'escort service', 'lingerie',

// 🚫 প্রাপ্তবয়স্ক ওয়েবসাইট ব্লক
'xnxx', 'xvideos', 'pornhub', 'redtube', 'brazzers', 'youporn', 'hclips', 
'spankbang', 'fapster', 'pornhd', 'tnaflix', 'chaturbate', 'cam4', 'livejasmin', 
'bangbros', 'playboy', 'hustler', 'bongacams', 'camsoda', 'onlyfans', 
'erome', 'freeporn', 'sexvids', 'tube8', 'mofos', 'realitykings', 'evilangel', 
'naughtyamerica', 'fakehub', 'teamSkeet', 'sxyprn', 'boobsrealm', 'pornmd',
'adultfriendfinder', 'puretaboo', 'javhd', 'yespornplease', 'pornmaki',

// 🔥 সহিংসতা ও অপরাধমূলক শব্দ (বাংলা)
'খুন', 'মারামারি', 'নৃশংস', 'সন্ত্রাস', 'বোমা', 'আক্রমণ', 'জঙ্গি', 'নাশকতা',
'চোর', 'ডাকাতি', 'অস্ত্র', 'হামলা', 'গুন্ডা', 'গ্যাং', 'খারাপ', 'নৃশংসতা', 
'রক্তপাত', 'হত্যা', 'ধর্ষক', 'অপহরণ', 'ভয়াবহ', 'নির্যাতন', 'জেহাদ', 'গণহত্যা',

// 🏴‍☠️ প্রতারণামূলক ওয়েবসাইট ও স্প্যাম
'lottery', 'casino', 'betting', 'online betting', 'fake job', 'money scam', 
'loan fraud', 'fake investment', 'pyramid scheme', 'crypto scam', 'blackhat',
'forex fraud', 'ponzi scheme', 'counterfeit', 'hacking', 'spam website',
'get rich quick', 'clickbait', 'phishing', 'carding', 'stolen data',

// 🎰 জুয়া সংক্রান্ত ওয়েবসাইট ব্লক
'bet365', '1xbet', 'pinnacle', 'betway', 'betfair', 'unibet', '888sport',
'sportingbet', 'williamhill', 'sbobet', 'dafabet', 'parimatch', 'leovegas',
'22bet', 'casumo', 'jackpotcity', '888casino', 'spinpalace', 'betonline',
'pokerstars', 'blackjack', 'roulette', 'slotmachine', 'free spins', 'poker'
];
let currentPage = 1;
let currentQuery = "";
function searchResults(query, page = 1) {
const API_KEY = 'AIzaSyDKXpESEQAgLuZSkHqgG-gEPxZBViozuJg';  // Your API Key
const CX_KEY = 'c10244d8b3e1843b9';  // Replace with your Custom Search Engine ID
const startIndex = (page - 1) * 10 + 1;
const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&key=${API_KEY}&cx=${CX_KEY}&start=${startIndex}&safe=active`;

fetch(url)
.then(response => response.json())
.then(data => {
const results = data.items;
const searchResultsContainer = document.getElementById('search-results');
searchResultsContainer.innerHTML = ''; // Clear previous results

if (results && results.length > 0) {
    results.forEach(item => {
        // Check if the result contains any bad Bengali words
        let containsBadWords = false;
        badWords.forEach(word => {
            if (item.title.toLowerCase().includes(word) || item.snippet.toLowerCase().includes(word)) {
                containsBadWords = true;
            }
        });

        // If the result contains any bad words, skip it
        if (containsBadWords) return;

        const resultItem = document.createElement('div');
        resultItem.classList.add('result-item');

        // Adding the thumbnail image and source site name
        const thumbnail = item.pagemap && item.pagemap.cse_image ? item.pagemap.cse_image[0].src : '';  // Empty string for no image
        const siteName = new URL(item.link).hostname.replace('www.', '');

        resultItem.innerHTML = `
            <div class="result-thumbnail">
                <img 
                    src="${thumbnail || 'https://via.placeholder.com/150'}" 
                    srcset="${thumbnail}-small.jpg 480w, ${thumbnail}-medium.jpg 768w, ${thumbnail}-large.jpg 1200w" 
                    sizes="(max-width: 600px) 100vw, 50vw"
                    alt="${item.title}" 
                    class="thumbnail-img" 
                    onerror="this.style.display='none'">
            </div>
            <div class="result-info">
                <a href="${item.link}" target="_blank" class="result-link">
                    <h3 class="result-title">${item.title}</h3>
                </a>
                <p class="result-description">${item.snippet}</p>
                <span class="source-name">${siteName}</span>
            </div>
        `;
        searchResultsContainer.appendChild(resultItem);
    });

    // Update pagination buttons
    updatePagination(data.queries.nextPage, data.queries.previousPage);
} else {
    searchResultsContainer.innerHTML = '<p>কোনো ফলাফল পাওয়া যায়নি।</p>';
}
})
.catch(error => {
console.error('Error fetching search results:', error);
document.getElementById('search-results').innerHTML = '<p>ফলাফল লোড করতে সমস্যা হয়েছে।</p>';
});
}

// Update the pagination buttons based on the next page availability
function updatePagination(nextPage, previousPage) {
const paginationContainer = document.getElementById('pagination');
paginationContainer.innerHTML = '';

const prevButton = document.createElement('button');
prevButton.textContent = 'পূর্ববর্তী';
prevButton.disabled = !previousPage;
prevButton.addEventListener('click', () => {
if (currentPage > 1) {
currentPage--;
searchResults(currentQuery, currentPage);
}
});

const nextButton = document.createElement('button');
nextButton.textContent = 'পরবর্তী';
nextButton.disabled = !nextPage;
nextButton.addEventListener('click', () => {
currentPage++;
searchResults(currentQuery, currentPage);
});

paginationContainer.appendChild(prevButton);
paginationContainer.appendChild(nextButton);
}

// Get the query parameter from the URL
const urlParams = new URLSearchParams(window.location.search);
const queryParam = urlParams.get('query');
if (queryParam) {
currentQuery = queryParam;
searchResults(queryParam);
}