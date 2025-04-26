window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');
    const input = document.getElementById('searchInput');
    if (query) {
        input.placeholder = query;
    }
};

// Bengali and English bad words list
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
    'naughtyamerica', 'fakehub', 'teamskeet', 'sxyprn', 'boobsrealm', 'pornmd',
    'adultfriendfinder', 'puretaboo', 'javhd', 'yespornplease', 'pornmaki',
    // 🔥 সহিংসতা ও অপরাধমূলক শব্দ
    'খুন', 'মারামারি', 'নৃশংস', 'সন্ত্রাস', 'বোমা', 'আক্রমণ', 'জঙ্গি', 'নাশকতা',
    'চোর', 'ডাকাতি', 'অস্ত্র', 'হামলা', 'গুন্ডা', 'গ্যাং', 'খারাপ', 'নৃশংসতা',
    'রক্তপাত', 'হত্যা', 'ধর্ষক', 'অপহরণ', 'ভয়াবহ', 'নির্যাতন', 'জেহাদ', 'গণহত্যা',
    // 🏴‍☠️ প্রতারণা ও স্প্যাম
    'lottery', 'casino', 'betting', 'online betting', 'fake job', 'money scam',
    'loan fraud', 'fake investment', 'pyramid scheme', 'crypto scam', 'blackhat',
    'forex fraud', 'ponzi scheme', 'counterfeit', 'hacking', 'spam website',
    'get rich quick', 'clickbait', 'phishing', 'carding', 'stolen data',
    // 🎰 জুয়া সংক্রান্ত
    'bet365', '1xbet', 'pinnacle', 'betway', 'betfair', 'unibet', '888sport',
    'sportingbet', 'williamhill', 'sbobet', 'dafabet', 'parimatch', 'leovegas',
    '22bet', 'casumo', 'jackpotcity', '888casino', 'spinpalace', 'betonline',
    'pokerstars', 'blackjack', 'roulette', 'slotmachine', 'free spins', 'poker'
];

let currentPage = 1;
let currentQuery = "";

function searchResults(query, page = 1) {
    const API_KEY = 'BSAuysYkY4TMapNnh_zBDbHA46KcIuf'; // 🔥 Replace with your Brave API Key
    const RESULTS_PER_PAGE = 10;
    const offset = (page - 1) * RESULTS_PER_PAGE;

    const url = `https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(query)}&count=${RESULTS_PER_PAGE}&offset=${offset}`;

    fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'X-Subscription-Token': API_KEY
        }
    })
    .then(response => response.json())
    .then(data => {
        const results = data.results;
        const searchResultsContainer = document.getElementById('search-results');
        searchResultsContainer.innerHTML = '';

        if (results && results.length > 0) {
            results.forEach(item => {
                let containsBadWords = false;
                badWords.forEach(word => {
                    if (item.title.toLowerCase().includes(word) || item.description.toLowerCase().includes(word)) {
                        containsBadWords = true;
                    }
                });

                if (containsBadWords) return;

                const resultItem = document.createElement('div');
                resultItem.classList.add('result-item');

                const thumbnail = item.profile_image_url || 'https://via.placeholder.com/150';
                const siteName = new URL(item.url).hostname.replace('www.', '');

                resultItem.innerHTML = `
                    <div class="result-thumbnail">
                        <img 
                            src="${thumbnail}" 
                            alt="${item.title}" 
                            class="thumbnail-img" 
                            onerror="this.style.display='none'">
                    </div>
                    <div class="result-info">
                        <a href="${item.url}" target="_blank" class="result-link">
                            <h3 class="result-title">${item.title}</h3>
                        </a>
                        <p class="result-description">${item.description}</p>
                        <span class="source-name">${siteName}</span>
                    </div>
                `;
                searchResultsContainer.appendChild(resultItem);
            });

            updatePagination(results.length);
        } else {
            searchResultsContainer.innerHTML = '<p>কোনো ফলাফল পাওয়া যায়নি।</p>';
        }
    })
    .catch(error => {
        console.error('Error fetching search results:', error);
        document.getElementById('search-results').innerHTML = '<p>ফলাফল লোড করতে সমস্যা হয়েছে।</p>';
    });
}

function updatePagination(resultsCount) {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';

    const prevButton = document.createElement('button');
    prevButton.textContent = 'পূর্ববর্তী';
    prevButton.disabled = (currentPage <= 1);
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            searchResults(currentQuery, currentPage);
        }
    });

    const nextButton = document.createElement('button');
    nextButton.textContent = 'পরবর্তী';
    nextButton.disabled = (resultsCount < 10); // disable if fewer than 10 results
    nextButton.addEventListener('click', () => {
        currentPage++;
        searchResults(currentQuery, currentPage);
    });

    paginationContainer.appendChild(prevButton);
    paginationContainer.appendChild(nextButton);
}

// Initial load from URL
const urlParams = new URLSearchParams(window.location.search);
const queryParam = urlParams.get('query');
if (queryParam) {
    currentQuery = queryParam;
    searchResults(queryParam);
}
