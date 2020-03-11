(function () {
    "use strict";
    angular.module("librarydatabases.filter", []).filter("librarydatabasesFilter",
        function () {
            return function (items, categoryFilter) {
                var filtered = [];
               
                angular.forEach(items, function (item) {
                    var add = true;
                    if(categoryFilter.length > 0 && add == true)
                    {
                         add = false;
                         angular.forEach(item.Category, function (category) {
                             if(categoryFilter.indexOf(category.Text) != -1)
                             {
                                 add = true;
                             }
                        });
                    }

                    if (add) {
                        filtered.push(item);
                    }
                });

                return filtered;
            };
        });
} ());