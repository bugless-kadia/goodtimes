let newsList = [];
let url = new URL(`https://tubular-crostata-0ed0ae.netlify.app/top-headlines`);
let totalResults = 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;
const openNav = () => {
  document.getElementById('mySidenav').style.width = '250px';
};
const closeNav = () => {
  document.getElementById('mySidenav').style.width = '0';
};
const menus = document.querySelectorAll('.menus button');
menus.forEach((menu) =>
  menu.addEventListener('click', (event) => getNewsByCategory(event))
);
const sideMenus = document.querySelectorAll('.side-menu-list button');
sideMenus.forEach((sideMenu) =>
  sideMenu.addEventListener('click', (event) => getNewsByCategory(event))
);
console.log(sideMenus);

const getNews = async () => {
  try {
    url.searchParams.set('page', page); // -> &page=page
    url.searchParams.set('pageSize', pageSize);

    const response = await fetch(url);
    console.log(response);
    const data = await response.json();
    console.log(data);
    if (response.status === 200) {
      if (data.articles.length === 0) {
        throw new Error('now result for this search');
      }
      newsList = data.articles;
      totalResults = data.totalResults;
      render();
      paginationRender();
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.log('error', error);
    errorRender(error);
  }
};

const getLatestNews = async () => {
  url = new URL(`https://tubular-crostata-0ed0ae.netlify.app/top-headlines`);
  getNews();
};

const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  console.log(category);
  url = new URL(
    `https://tubular-crostata-0ed0ae.netlify.app/top-headlines?category=${category}`
  );
  getNews();
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
  url = new URL(
    `https://tubular-crostata-0ed0ae.netlify.app/top-headlines?q=${keyword}`
  );
  getNews();
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

const errorRender = (errorMessage) => {
  const errorHTML = `<div class="alert alert-danger" role="alert">
  ${errorMessage}
</div>`;

  document.getElementById('news-board').innerHTML = errorHTML;
};

const paginationRender = () => {
  // totalResults
  // page
  // pageSize
  // groupSize

  // totalPages
  const totalPages = Math.ceil(totalResults / pageSize);
  // pageGroup
  const pageGroup = Math.ceil(page / groupSize);
  // lastPage
  let lastPage = pageGroup * groupSize;
  // lastPage가 totalPages보다 크다면?
  if (lastPage > totalPages) {
    lastPage = totalPages;
  }
  // firstPage
  const firstPage =
    lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1);

  let paginationHTML = ``;

  for (let i = firstPage; i <= lastPage; i++) {
    paginationHTML += `<li class="page-item ${
      i === page ? 'active' : ''
    }" onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>`;
  }

  document.querySelector('.pagination').innerHTML = paginationHTML;
};

const moveToPage = (pageNum) => {
  console.log(pageNum);
  page = pageNum;
  getNews();
};

getLatestNews();
