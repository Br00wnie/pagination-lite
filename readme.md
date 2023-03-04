# PAGINATION LITE

![Version: 1.0.0](https://img.shields.io/badge/version-1.0.0-orange?style=for-the-badge)
![License: MIT](https://img.shields.io/badge/license-MIT-orange?style=for-the-badge)

![Screen of pagination list from demo](https://i.ibb.co/jZRCtLw/pagination.png)

Simple implementation of pagination list through a class by [Br00wnie](https://github.com/Br00wnie "Profile on GitHub")

## Demo

You can get acquainted with the pagination list by using an interactive demo. Just run _index.html_ on your local server
in updated Firefox or Chrome

## 3 steps to use

1. Download a _pagination.js_ and import it into your project with any suitable name

2. Now you have a pagination class. Its constructor requires a config. Create it

```javascript
const CONFIG = {
  // all properties below are required
  numberOfArticles, // positive integer
  articlesPerPage,  // positive integer
  pagesOnSides,     // positive integer
  paginationDiv,    // link to your div for pagination
  handlerFunction,  // function called when switching pages,
};                  // takes a number of new page as argument
```

3. Finally, create a pagination list and update it to display

```javascript
const PAGINATION = new Pagination(CONFIG);
PAGINATION.update();
```

## Really quick documentation

Requires reading the section [3 steps to use](#3-steps-to-use)!

### 1. Constructor vars

You can always change your constructor vars, but don't forget about the range for numeric fields. The class can throw an
exception

### 2. Updating

The pagination class has a single method `.update()`. It can be passed the number of the page (by default, 1) where our
user should be moved. The method clears the pagination div and outputs an updated pagination list on the selected page

You can leave the user on the same page. If there is no such page, the user will automatically move to the last one
***
Note that after changing the pagination parameters, it needs to be updated for the changes to take effect
***

### 3. Current page number and number of pages

You can change `.currentPage` (it requires a positive int <= the number of pages). But `.numberOfPages` is read-only

### 4. Classes and content

To simplify your styling of the pagination list, you can change the classes and content of some its items

|            path             |     default value     |
| :-------------------------: | :-------------------: |
|  `.classes.paginationList`  | `["pagination-list"]` |
| `.classes.currentPageItem`  |     `["checked"]`     |
|  `.classes.disabledItems`   |    `["disabled"]`     |
| `.content.specificPageItem` |      `"&rarrb;"`      |
|  `.content.randomPageItem`  |         `"?"`         |
|  `.content.disabledItems`   |        `"..."`        |
