        const trendingKeywords = [
            "বাংলাদেশ ফুটবল",
            "হামজা চৌধুরী",
            "আজকের খবর",
            "ড. ইউনূস",
            "ঢাকায় ঈদ",
            "অনলাইন ক্লাস",
            "রেসিপি",
            "সরকারি চাকরি",
            "সিনেমা",
            "উইকিপিডিয়া বিতর্ক",
            "শিক্ষাবৃত্তি"
        ];

        const trendingList = document.getElementById("trending-list");

        trendingKeywords.forEach(keyword => {
            const listItem = document.createElement("li");
            listItem.textContent = keyword;
            listItem.addEventListener("click", () => {
                document.querySelector(".search-input").value = keyword;
                document.querySelector(".search-form").submit();
            });
            trendingList.appendChild(listItem);
        });

        function updateDateTime() {
            const now = new Date();
            const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
            const formattedDateTime = now.toLocaleDateString('bn-BD', options);
            document.getElementById('datetime').textContent = formattedDateTime;
        }

        updateDateTime();
        setInterval(updateDateTime, 1000);