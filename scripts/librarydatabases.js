(function () {
    "use strict";
    angular
        .module("librarydatabases.service", []).factory("librarydatabases",
        function librarydatabases($resource) {
            return $resource("/api/apps/librarydatabases(:id)");
        });
}());