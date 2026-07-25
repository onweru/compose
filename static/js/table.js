/*!
 * Compose theme — chart-table filter/sort.
 * Self-authored replacement for the two W3Schools w3.js functions
 * (filterHTML / sortHTML) previously used by the `chart` shortcode.
 * MIT — part of the Compose theme; no third-party code.
 *
 * Behaviour is a faithful port of the originals:
 *  - filter: case-insensitive substring match on each row's innerHTML.
 *  - sort:   lexicographic (lowercased) sort by a cell selector, toggling
 *            ascending -> descending when the column is already ascending.
 */
(function () {
  "use strict";

  function filter(tableSel, rowSel, term) {
    var needle = (term || "").toUpperCase();
    var rows = document.querySelectorAll(rowSel);
    for (var i = 0; i < rows.length; i++) {
      var match = rows[i].innerHTML.toUpperCase().indexOf(needle) > -1;
      rows[i].style.display = match ? "" : "none";
    }
  }

  function sort(tableSel, rowSel, cellSel) {
    var table = document.querySelector(tableSel);
    if (!table) {
      return;
    }
    var rows = Array.prototype.slice.call(table.querySelectorAll(rowSel));
    if (rows.length < 2) {
      return;
    }
    function value(row) {
      var cell = cellSel ? row.querySelector(cellSel) : row;
      return cell ? cell.innerHTML.toLowerCase() : "";
    }
    var ascending = rows.slice().sort(function (a, b) {
      var x = value(a), y = value(b);
      return x < y ? -1 : x > y ? 1 : 0;
    });
    // Match w3.sortHTML: if the column is already ascending, sort descending.
    var alreadyAscending = rows.every(function (row, i) {
      return row === ascending[i];
    });
    var ordered = alreadyAscending
      ? rows.slice().sort(function (a, b) {
          var x = value(a), y = value(b);
          return x < y ? 1 : x > y ? -1 : 0;
        })
      : ascending;
    var parent = rows[0].parentNode;
    ordered.forEach(function (row) {
      parent.appendChild(row);
    });
  }

  window.composeTable = { filter: filter, sort: sort };
})();
