const API_KEY = `d46cd1e848504711a9bd8cecfdf58fab`;
let news = [];
const getLatestNews = async () => {
  const url = new URL(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
  );
  const response = await fetch(url);
  const data = await response.json();
  news = data.articles;
  console.log('rrr', news);
};
getLatestNews();
