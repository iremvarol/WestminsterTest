(function () {
    "use strict";
    angular.module('myApp')
        .controller('AppController', ["$scope", "$http", "$attrs", "$uibModal", "librarydatabases", AppController]);

    function AppController($scope, $http, $attrs, $uibModal, librarydatabases) {
        var vm = this;
        vm.categoryFilter = [];
        vm.categories = [{ "name": "All", "active": true }];
        vm.librarydatabases = [];

        var dbUrl = "https://www.westminstercollege.edu/api/apps/librarydatabases()";
        getDatabases(dbUrl);

        function getDatabases(url) {
            $http.get(url).then(function (response) {
                getData(response.data)
            });
        }

        function getData(data) {
            vm.librarydatabases = vm.librarydatabases.concat(data.value);
            var next = data['@odata.nextLink'];
            if (next != undefined) {
                getDatabases(next);
            }
            else {
                categories();
            }
        }

        function categories() {
            angular.forEach(vm.librarydatabases, function (item) {
                addCategory(item);
            });
        }

      vm.interest = function (interest) {
            if (interest.name == "All") {
                angular.forEach(vm.librarydatabases, function (item) {
                    if (item.name == "All") {
                        item.active = true;
                    }
                    else {
                        item.active = false;
                    }
                });
                vm.categoryFilter = [];
                return;
            }
            else {
                interest.active = !interest.active;
                var index = vm.categoryFilter.indexOf(interest.name);
                if (index != -1) {
                    vm.categoryFilter.splice(index, 1);
                }
                else {
                    vm.categoryFilter.push(interest.name);
                }
                if (vm.categoryFilter.length == 0) {
                    vm.categories[0].active = true;
                }
                else {
                    vm.categories[0].active = false;
                }
            }
        };

        function findCategory(category) {
            for (var i = 0, len = vm.categories.length; i < len; i++) {
                if (vm.categories[i].name === category)
                    return vm.categories[i]; // Return as soon as the object is found
            }
            return undefined; // The object was not found
        }

        function addCategory(librarydatabase) {
            angular.forEach(librarydatabase.Category, function (item) {
                if (findCategory(item.Text) == undefined) {
                    vm.categories.push({ "name": item.Text, "active": false });
                }
            });
        }

        vm.showAllDatabases = function () {
            vm.showAllDatabases = false;
        };

        vm.toggleRow = function (librarydatabase) {
            if (!librarydatabase.isDetailVisible) {
                librarydatabase.isDetailVisible = true;
            }
            else {
                librarydatabase.isDetailVisible = false;
            }
        };
    }

    angular
        .module('myApp')
        .controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, item) {

            $scope.database = item;

            $scope.ok = function () {
                $uibModalInstance.close($scope.selected.item);
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        });
} ());


