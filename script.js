import Pagination from "./pagination.js";

const $INPUT_IDENTIFIERS = ["number-of-articles", "articles-per-page", "pages-on-sides",],
  $PAGINATION_DIV_ID = "pagination-div";

// articles
const $ARTICLES = [];
function updateNumberOfArticles() {
  $ARTICLES.length = 0;
  for (let i = 0; i < Number(document.getElementById($INPUT_IDENTIFIERS[0]).value); ++i) {
    $ARTICLES[i] = "Article №" + (i + 1);
  }
  console.log("Articles initialized:\n" + $ARTICLES);
}

// creating pagination
const $PAGINATION = (function () {
  const CONFIG = {
    numberOfArticles: document
      .getElementById($INPUT_IDENTIFIERS[0])
      .getAttribute("value"),
    articlesPerPage: document
      .getElementById($INPUT_IDENTIFIERS[1])
      .getAttribute("value"),
    pagesOnSides: document
      .getElementById($INPUT_IDENTIFIERS[2])
      .getAttribute("value"),
    paginationDiv: document.getElementById($PAGINATION_DIV_ID),
    handlerFunction: function (newPage) {
      const NUMBER_OF_ARTICLES_PER_PAGE = Number(document.getElementById($INPUT_IDENTIFIERS[1]).value);
      console.log(`Going to page ${newPage}`);
      let a = this.numberOfArticles - this.articlesPerPage * newPage;
      let b;
      if (a < 0) {
        b = this.articlesPerPage + a;
        a = 0;
      } else b = a + this.articlesPerPage;
      console.log(`Displayed articles:\n${$ARTICLES.slice(a, b).reverse()}`);
    },
  };
  return new Pagination(CONFIG);
})();
console.log("Pagination was created");
// onload function
window.onload = function () {
  resetPaginationDiv();
  initializeButtons();
};
// resetting inputs
function resetInputs() {
  let input = document.getElementById($INPUT_IDENTIFIERS[0]);
  input.value = document
    .getElementById($INPUT_IDENTIFIERS[0])
    .getAttribute("value");
  input = document.getElementById($INPUT_IDENTIFIERS[1]);
  input.value = document
    .getElementById($INPUT_IDENTIFIERS[1])
    .getAttribute("value");
  input = document.getElementById($INPUT_IDENTIFIERS[2]);
  input.value = document
    .getElementById($INPUT_IDENTIFIERS[2])
    .getAttribute("value");
}
// updating pagination
function updatePagination() {
  let p = document.querySelector(`#${$PAGINATION_DIV_ID} p`);
  if (p) p.remove();

  let numberOfArticles = document.getElementById($INPUT_IDENTIFIERS[0]).value;
  let articlesPerPage = document.getElementById($INPUT_IDENTIFIERS[1]).value;
  let pagesOnSides = document.getElementById($INPUT_IDENTIFIERS[2]).value;

  const CONDITION = " must be a positive integer" + "\n";
  let checkResult = "";
  if (!isPositiveInteger(numberOfArticles)) {
    checkResult += "Number of articles" + CONDITION;
  }
  if (!isPositiveInteger(articlesPerPage)) {
    checkResult += "Number of articles per page" + CONDITION;
  }
  if (!isPositiveInteger(pagesOnSides)) {
    checkResult += "Number of pages on sides" + CONDITION;
  }
  if (checkResult !== "") {
    alert(checkResult.substring(0, checkResult.length - 1));
    return;
  }

  updateNumberOfArticles();

  $PAGINATION.numberOfArticles = numberOfArticles;
  $PAGINATION.articlesPerPage = articlesPerPage;
  $PAGINATION.pagesOnSides = pagesOnSides;

  console.log("Pagination was updated");
  $PAGINATION.update($PAGINATION.currentPage);
}
// resetting pagination div
function resetPaginationDiv() {
  let paginationDiv = document.getElementById($PAGINATION_DIV_ID);
  let p = document.createElement("p");
  p.innerHTML = "#" + $PAGINATION_DIV_ID;
  paginationDiv.append(p);
}
// buttons initialization
function initializeButtons() {
  let button = document.getElementById("reset");
  button.onclick = resetInputs;
  button = document.getElementById("update");
  button.onclick = updatePagination;
}
// help function
let isPositiveInteger = (number) => Number.isInteger(Number(number)) && Number(number) > 0;
