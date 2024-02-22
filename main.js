let newsList = [];
const openNav = () => {
  document.getElementById('mySidenav').style.width = '250px';
};
const closeNav = () => {
  document.getElementById('mySidenav').style.width = '0';
};
const menus = document.querySelectorAll('.menus button');
console.log(menus);
menus.forEach((menu) =>
  menu.addEventListener('click', (event) => getNewsByCategory(event))
);

const getLatestNews = async () => {
  const url = new URL(
    `https://tubular-crostata-0ed0ae.netlify.app/top-headlines`
  );
  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;
  render();
  console.log('rrr', newsList);
};

const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  console.log(category);
  const url = new URL(
    `https://tubular-crostata-0ed0ae.netlify.app/top-headlines?category=${category}`
  );
  const response = await fetch(url);
  const data = await response.json();
  console.log('DDD', data);
  newsList = data.articles;
  render();
};

const openSearchBox = () => {
  let inputArea = document.getElementById('input-area');
  if (inputArea.style.display === 'inline') {
    inputArea.style.display = 'none';
  } else {
    inputArea.style.display = 'inline';
  }
};
const searchNews = async () => {
  let searchInput = document.getElementById('search-input');
  const keyword = searchInput.value;
  const url = new URL(
    `https://tubular-crostata-0ed0ae.netlify.app/top-headlines?q=${keyword}`
  );
  const response = await fetch(url);
  const data = await response.json();
  console.log('abc', data);
  newsList = data.articles;
  render();
};

const render = () => {
  const newsHTML = newsList
    .map(
      (news) =>
        `<div class="row news">
    <div class="col-lg-4">
      <img
        class="news-img-size"
        src=${
          news.urlToImage ||
          'https://st4.depositphotos.com/14953852/22772/v/450/depositphotos_227724992-stock-illustration-image-available-icon-flat-vector.jpg'
        }
      />
    </div>
    <div class="col-lg-8">
      <h2>${news.title}</h2>
      <p>
        ${
          news.description == null || news.description == ''
            ? '내용없음'
            : news.description.length > 200
            ? news.description.substring(0, 200) + '...'
            : news.description
        }
      </p>
      <div>
        ${news.source.name || 'no source'} * ${moment(
          news.publishedAt
        ).fromNow()}
      </div>
    </div>
  </div>`
    )
    .join('');
  document.getElementById('news-board').innerHTML = newsHTML;
};
getLatestNews();
