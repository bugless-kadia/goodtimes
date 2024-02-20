let news = [];
const getLatestNews = async () => {
  const url = new URL(
    `https://tubular-crostata-0ed0ae.netlify.app/top-headlines`
  );
  const response = await fetch(url);
  const data = await response.json();
  news = data.articles;
  console.log('rrr', news);
};
getLatestNews();
