const API_KEY = `d46cd1e848504711a9bd8cecfdf58fab`;
let news = [];
const getLatestNews = async () => {
  const url = new URL(
    `http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines`
  );
  const response = await fetch(url);
  const data = await response.json();
  news = data.articles;
  console.log('rrr', news);
};
getLatestNews();
