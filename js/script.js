(function (global) {

  var dc = {};

  var homeHtmlUrl = "snippets/home-snippet.html";
  var allCategoriesUrl = "https://coursera-jhu-default-rtdb.firebaseio.com/categories.json";

  // Insert HTML
  function insertHtml(selector, html) {
    var targetElem = document.querySelector(selector);
    targetElem.innerHTML = html;
  }

  // Replace {{propName}} with propValue
  function insertProperty(template, propName, propValue) {
    var propToReplace = "{{" + propName + "}}";
    return template.replace(new RegExp(propToReplace, "g"), propValue);
  }

  // Pick a random category
  function chooseRandomCategory(categories) {
    var randomIndex = Math.floor(Math.random() * categories.length);
    return categories[randomIndex];
  }

  // Load menu items for a category
  dc.loadMenuItems = function (shortName) {
    var url = `https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/${shortName}.json`;
    $ajaxUtils.sendGetRequest(url, function (data) {
      var html = `<h2>Category: ${shortName}</h2><ul>`;
      for (var i = 0; i < data.menu_items.length; i++) {
        html += `<li>${data.menu_items[i].name} - ${data.menu_items[i].description}</li>`;
      }
      html += "</ul>";
      insertHtml("#main-content", html);
    });
  };

  // Load home page with random special
  dc.loadHomePage = function () {
    $ajaxUtils.sendGetRequest(
      allCategoriesUrl,
      function (categories) {
        var randomCategory = chooseRandomCategory(categories);
        $ajaxUtils.sendGetRequest(
          homeHtmlUrl,
          function (homeHtml) {
            var finalHtml = insertProperty(
              homeHtml,
              "randomCategoryShortName",
              "'" + randomCategory.short_name + "'"
            );
            insertHtml("#main-content", finalHtml);
          },
          false);
      },
      true);
  };

  global.$dc = dc;

})(window);
