(function () {
    "use strict";
    angular
        .module("program.service", []).factory("program",
        function program($resource) {
            return $resource("/api/apps/programs(:id)");
        });
}());