// Function to perform search
function search() {
  const query = document.getElementById('search').value;
  if (query) {
    window.location.href = `https://www.google.com/search?q=${query}`;
  }
}
