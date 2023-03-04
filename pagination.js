export default class Pagination {
  // constructor vars
  #numberOfArticles;
  get numberOfArticles() {
    return this.#numberOfArticles;
  }
  set numberOfArticles(newValue) {
    if (!this.#isPositiveInteger(newValue))
      throw new RangeError("Number of articles" + this.#alertTail);
    this.#numberOfArticles = Number(newValue);
  }
  #articlesPerPage;
  get articlesPerPage() {
    return this.#articlesPerPage;
  }
  set articlesPerPage(newValue) {
    if (!this.#isPositiveInteger(newValue))
      throw new RangeError("Number of articles per page" + this.#alertTail);
    this.#articlesPerPage = Number(newValue);
  }
  #pagesOnSides;
  get pagesOnSides() {
    return this.#pagesOnSides;
  }
  set pagesOnSides(newValue) {
    if (!this.#isPositiveInteger(newValue))
      throw new RangeError("Number of pages on sides" + this.#alertTail);
    this.#pagesOnSides = Number(newValue);
  }
  paginationDiv;
  handlerFunction;
  // constructor
  constructor({
    numberOfArticles,
    articlesPerPage,
    pagesOnSides,
    paginationDiv,
    handlerFunction,
  }) {
    this.numberOfArticles = numberOfArticles;
    this.articlesPerPage = articlesPerPage;
    this.pagesOnSides = pagesOnSides;
    this.paginationDiv = paginationDiv;
    this.handlerFunction = handlerFunction;
  }

  // generated vars
  #numberOfPages;
  get numberOfPages() {
    return this.#numberOfPages;
  }
  #currentPage;
  get currentPage() {
    return this.#currentPage;
  }
  set currentPage(newValue) {
    if (
      !(
        this.#isPositiveInteger(newValue) &&
        Number(newValue) <= this.#numberOfPages
      )
    )
      throw new RangeError(this.#pageNumberAlert);
    this.#currentPage = Number(newValue);
  }
  // visualisation vars
  classes = {
    get paginationList() {
      return this.#list.classes;
    },
    set paginationList(newClasses) {
      this.#list.classes = newClasses;
    },
    get currentPageItem() {
      return this.#items.currentPageItem.classes;
    },
    set currentPageItem(newClasses) {
      this.#items.currentPageItem.classes = newClasses;
    },
    get disabledItems() {
      return this.#items.disabledItems.classes;
    },
    set disabledItems(newClasses) {
      this.#items.disabledItems.classes = newClasses;
    },
  };
  content = {
    get randomPageItem() {
      return this.#items.randomPageItem.content;
    },
    set randomPageItem(newContent) {
      this.#items.randomPageItem.content = newContent;
    },
    get disabledItems() {
      return this.#items.disabledItems.content;
    },
    set disabledItems(newContent) {
      this.#items.disabledItems.content = newContent;
    },
    get specificPageItem() {
      return this.#items.specificPageItem.content;
    },
    set specificPageItem(newContent) {
      this.#items.specificPageItem.content = newContent;
    },
  };
  // private methods
  #isPositiveInteger = (number) =>
    Number.isInteger(Number(number)) && Number(number) > 0;
  #changeCurrentPage(pageNumber) {
    if (pageNumber !== -1) {
      this.#currentPage = pageNumber;
      this.#updateItems();
      return;
    }
    // for user input
    let input = prompt(
      `The number of the desired page (an integer from 1 to ${
        this.#numberOfPages
      }):`
    );
    input && this.#isPositiveInteger(input) && input <= this.#numberOfPages
      ? this.#changeCurrentPage(Number(input))
      : alert(this.#pageNumberAlert);
  }
  #getClassAttribute(array) {
    let result = "";
    for (let item of array) result = result + item + " ";
    return result.slice(0, -1);
  }
  #updateItems() {
    if (this.#list.link === null) this.#list.createAndAppend();
    else this.#list.link.innerHTML = "";

    this.#items.randomPageItem.createAndAppend();
    this.#items.firstPageItem.createAndAppend();
    this.#items.disabledItems.leftItem.createAndAppend();
    this.#items.previousPageItems.createAndAppend();
    this.#items.currentPageItem.createAndAppend();
    this.#items.nextPageItems.createAndAppend();
    this.#items.disabledItems.rightItem.createAndAppend();
    this.#items.lastPageItem.createAndAppend();
    this.#items.specificPageItem.createAndAppend();

    this.handlerFunction(this.#currentPage);
  }
  // update method
  update = (numberOfPage = 1) => {
    this.#numberOfPages = Math.ceil(
      this.#numberOfArticles / this.#articlesPerPage
    );

    if (!this.#isPositiveInteger(numberOfPage))
      throw new RangeError(this.#pageNumberAlert);
    // we have positive integer
    if (Number(numberOfPage) <= this.#numberOfPages)
      this.#currentPage = numberOfPage;
    else this.#currentPage = this.#numberOfPages;
    this.#updateItems();
  };
  // private vars
  #pageNumberAlert =
    "You need to enter an integer from 1 to " + this.#numberOfPages;
  #alertTail = " must be a positive integer";
  #list = {
    createAndAppend: () => {
      const PAGINATION_LIST = document.createElement("ul");
      PAGINATION_LIST.setAttribute(
        "class",
        this.#getClassAttribute(this.#list.classes)
      );
      this.paginationDiv.append(PAGINATION_LIST);
      this.#list.link = PAGINATION_LIST;
    },
    classes: ["pagination-list"],
    link: null,
  };
  #items = {
    firstPageItem: {
      createAndAppend: () => {
        if (this.#currentPage - this.#pagesOnSides < 2) return;
        const LI = document.createElement("li"),
          A = document.createElement("a");
        A.innerHTML = "1";
        A.onclick = () => {
          this.#changeCurrentPage(1);
        };
        LI.append(A);
        this.#list.link.append(LI);
      },
    },
    previousPageItems: {
      createAndAppend: () => {
        for (let i = this.#pagesOnSides; i > 0; i--) {
          const ADDED_PAGE_NUMBER = this.#currentPage - i;
          if (ADDED_PAGE_NUMBER < 1) continue;
          const LI = document.createElement("li"),
            A = document.createElement("a");
          A.innerHTML = String(ADDED_PAGE_NUMBER);
          A.onclick = () => {
            this.#changeCurrentPage(ADDED_PAGE_NUMBER);
          };
          LI.append(A);
          this.#list.link.append(LI);
        }
      },
    },
    currentPageItem: {
      createAndAppend: () => {
        const LI = document.createElement("li");
        LI.innerHTML = String(this.#currentPage);
        LI.setAttribute(
          "class",
          this.#getClassAttribute(this.#items.currentPageItem.classes)
        );
        this.#list.link.append(LI);
      },
      classes: ["checked"],
    },
    nextPageItems: {
      createAndAppend: () => {
        for (let i = 1; i < Number(this.#pagesOnSides) + 1; i++) {
          const ADDED_PAGE_NUMBER = this.#currentPage + i;
          if (ADDED_PAGE_NUMBER > this.#numberOfPages) break;
          const LI = document.createElement("li"),
            A = document.createElement("a");
          A.innerHTML = String(ADDED_PAGE_NUMBER);
          A.onclick = () => {
            this.#changeCurrentPage(ADDED_PAGE_NUMBER);
          };
          LI.append(A);
          this.#list.link.append(LI);
        }
      },
    },
    disabledItems: {
      leftItem: {
        createAndAppend: () => {
          if (this.#currentPage <= this.#pagesOnSides + 2) return;

          if (this.#currentPage - (this.#pagesOnSides + 2) === 1) {
            // no point in using hiding item, because it can be replaced
            const LI = document.createElement("li"),
              A = document.createElement("a");
            A.innerHTML = "2";
            A.onclick = () => {
              this.#changeCurrentPage(2);
            };
            LI.append(A);
            this.#list.link.append(LI);
          } else {
            // there is a point in using hiding item
            const LI = document.createElement("li");
            LI.setAttribute(
              "class",
              this.#getClassAttribute(this.#items.disabledItems.classes)
            );
            LI.innerHTML = this.#items.disabledItems.content;
            this.#list.link.append(LI);
          }
        },
      },
      rightItem: {
        createAndAppend: () => {
          if (
            this.#currentPage >=
            this.#numberOfPages - (this.#pagesOnSides + 1)
          )
            return;

          if (
            this.#currentPage + this.#pagesOnSides + 2 ===
            this.#numberOfPages
          ) {
            // no point in using disabled item, because it can be replaced
            const LI = document.createElement("li"),
              A = document.createElement("a");
            A.innerHTML = String(this.#numberOfPages - 1);
            A.onclick = () => {
              this.#changeCurrentPage(this.#numberOfPages - 1);
            };
            LI.append(A);
            this.#list.link.append(LI);
          } else {
            // there is a point in using hiding button
            const LI = document.createElement("li");
            LI.setAttribute(
              "class",
              this.#getClassAttribute(this.#items.disabledItems.classes)
            );
            LI.innerHTML = this.#items.disabledItems.content;
            this.#list.link.append(LI);
          }
        },
      },
      classes: ["disabled"],
      content: "&hellip;",
    },
    randomPageItem: {
      createAndAppend: () => {
        if (this.#numberOfPages <= 2) return;
        const LI = document.createElement("li"),
          A = document.createElement("a");
        let generatedPage = this.#currentPage;
        while (generatedPage === this.#currentPage) {
          generatedPage = Math.ceil(Math.random() * this.#numberOfPages);
        }
        A.innerHTML = this.#items.randomPageItem.content;
        A.onclick = () => {
          this.#changeCurrentPage(generatedPage);
        };
        LI.append(A);
        this.#list.link.append(LI);
      },
      content: "?",
    },
    specificPageItem: {
      createAndAppend: () => {
        if (this.#numberOfPages - (this.#pagesOnSides + 2) < 2) return;
        if (
          !(
            (this.#currentPage > this.#pagesOnSides + 2 &&
              !(this.#currentPage - (this.#pagesOnSides + 2) === 1)) ||
            (this.#currentPage <
              this.#numberOfPages - (this.#pagesOnSides + 1) &&
              !(
                this.#currentPage + this.#pagesOnSides + 2 ===
                this.#numberOfPages
              ))
          )
        )
          return;

        const LI = document.createElement("li"),
          A = document.createElement("a");
        A.innerHTML = this.#items.specificPageItem.content;
        A.onclick = () => {
          this.#changeCurrentPage(-1);
        };
        LI.append(A);
        this.#list.link.append(LI);
      },
      content: "&rarrb;",
    },
    lastPageItem: {
      createAndAppend: () => {
        if (this.#numberOfPages < this.#currentPage + this.#pagesOnSides + 1)
          return;

        const LI = document.createElement("li"),
          A = document.createElement("a");
        A.innerHTML = String(this.#numberOfPages);
        A.onclick = () => {
          this.#changeCurrentPage(this.#numberOfPages);
        };
        LI.append(A);
        this.#list.link.append(LI);
      },
    },
  };
}
