(function () {
    "use strict";
    angular.module('myApp')
        .controller('AppController', ["$scope", "$attrs", "$uibModal", "program", "$cookies", "$location", AppController]);

    function AppController($scope, $attrs, $uibModal, program, $cookies, $location) {
        var vm = this;
        vm.type =  ($attrs.type === undefined) ? "All" : $attrs.type;
        vm.view = 'Grid';
        vm.disciplineFilter = [];
        vm.disciplines = [{ "name": "All", "active": true }];

         vm.savedPrograms = $cookies.getObject('savedPrograms');
            if (vm.savedPrograms == undefined) {
                vm.savedPrograms = [];
            }

        if(vm.type == "All")
        {
            vm.filter = $cookies.getObject('savedFilter');
            if (vm.filter == undefined) {
                vm.filter = { ug: true, gr: true, major: true, minor: true, showSaved: false, course: true, pro: true };
            }
            else {
                if (!(vm.filter.ug == true && vm.filter.gr == true && vm.filter.major == true && vm.filter.minor == true && vm.filter.course == true && vm.filter.pro == true))
                    vm.expandToggle = true;
            }

           

            if ($location.search().showSaved) {
                vm.filter.showSaved = true;
            }

        }
        else if(vm.type == "GR")
        {
             vm.filter = { ug: false, gr: true, major: true, minor: true, showSaved: false, course: true, pro: false };
        }
        else if(vm.type == "UG")
        {
             vm.filter = { ug: true, gr: false, major: true, minor: true, showSaved: false, course: true, pro: false };
        }
        else if(vm.type == "PRO")
        {
             vm.filter = { ug: false, gr: false, major: true, minor: true, showSaved: false, course: true, pro: true };
        }
       


        program.get({
            $orderby:'ProgramName asc'},
            function (data) {
            vm.programs = data.value;
            program.get({
                $skip:50,
                $orderby:'ProgramName asc'
            }, function (data){
                vm.programs = vm.programs.concat(data.value);
                angular.forEach(vm.programs, function (item) {
                addDiscipline(item);
                if (vm.savedPrograms.indexOf(item.Id) != -1) {
                    item.saved = true;
                }
            });
            loadSavedDisciplines();
            });
        });




        vm.interest = function (interest) {
            if (interest.name == "All") {

                angular.forEach(vm.disciplines, function (item) {
                    if (item.name == "All") {
                        item.active = true;
                    }
                    else {
                        item.active = false;
                    }
                });
                vm.disciplineFilter = [];
                return;
            }
            else {
                interest.active = !interest.active;
                var index = vm.disciplineFilter.indexOf(interest.name);
                if (index != -1) {

                    vm.disciplineFilter.splice(index, 1);
                }
                else {
                    vm.disciplineFilter.push(interest.name);
                }
                if (vm.disciplineFilter.length == 0) {
                    vm.disciplines[0].active = true;

                }
                else {
                    vm.disciplines[0].active = false;
                }
            }

            var now = new Date();
            now.setMinutes(now.getMinutes() + 30);

            $cookies.putObject('savedDisciplineFilter', vm.disciplineFilter,{expires:now});


        };

        function loadSavedDisciplines() {
            var disciplineFilter = $cookies.getObject('savedDisciplineFilter');
            if (disciplineFilter == undefined) {
                vm.disciplineFilter = [];
            }
            else {
                angular.forEach(disciplineFilter, function (item) {
                    var discipline = findDiscipline(item);
                    vm.interest(discipline);

                });
            }
        }

        function findDiscipline(discipline) {
            for (var i = 0, len = vm.disciplines.length; i < len; i++) {
                if (vm.disciplines[i].name === discipline)
                    return vm.disciplines[i]; // Return as soon as the object is found
            }
            return undefined; // The object was not found

        }

        function addDiscipline(program) {
            if((vm.type == 'GR' && checkLevel(program,"Graduate") || vm.type != "GR"))
            {
                angular.forEach(program.TaxonomyProgramDiscipline, function (item) {
                if (findDiscipline(item.Text) == undefined) {
                    vm.disciplines.push({ "name": item.Text, "active": false });
                }

            });
            }
        }

        function checkLevel(program,level) {
            var ret = false;
            angular.forEach(program.TaxonomyAcademicLevel2, function (item) {
                if (item.Text == level) {
                    ret = true;
                }
            })
         return ret;
        }

        $scope.$watchCollection('vm.filter', function () {
            
            var now = new Date();
            now.setMinutes(now.getMinutes() + 30);
            $cookies.putObject('savedFilter', vm.filter,{expires:now});
        });

        vm.save = function (program) {
            if (vm.savedPrograms.indexOf(program.Id) == -1) {
                program.saved = true;
                vm.savedPrograms.push(program.Id);
                $cookies.putObject('savedPrograms', vm.savedPrograms);
            }
        };

        vm.remove = function (program) {
            var index = vm.savedPrograms.indexOf(program.Id);
            if (index != -1) {
                program.saved = false;
                vm.savedPrograms.splice(index, 1);
                $cookies.putObject('savedPrograms', vm.savedPrograms);
            }
        };

        vm.showSavedPrograms = function () {
            vm.showSaved = true;
        };

        vm.showAllPrograms = function () {
            vm.showAllPrograms = false;
        };


        $scope.changeValue = function () {
            $scope.vm.search.ProgramName = "";
        }; 


        // $scope.$watch(function () 
        //  {
        //     return $cookies.getObject('savedPrograms').length;
        //     }, function (data) {
        //     vm.savedPrograms = data;
        // });

        vm.toggleModal = function (program) {

            var modalInstance = $uibModal.open(
                {
                    animation: $scope.animationsEnabled,
                    templateUrl: 'detail.html',
                    controller: 'ModalInstanceCtrl',
                    size: 'lg',
                    resolve:
                    {
                        item: program
                    }
                });

        };

        vm.loadSavedPrograms = function () {
            var programs = $cookies.getObject('savedPrograms');
            var programData = [];
            angular.forEach(programs, function (item) {
                var data = program.get({ id: item }, function (data) {
                    console.log(data.Title);
                });

            });

            // var modalInstance = $uibModal.open(
            //     {
            //     animation: $scope.animationsEnabled,
            //     templateUrl: 'detail.html',
            //     controller: 'ModalInstanceCtrl',
            //     size: 'lg',
            //     resolve:
            //     {
            //         item: program
            //     }
            // });

        };


    }

    angular
        .module('myApp')
        .controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, item, $cookies) {

            $scope.program = item;

            $scope.ok = function () {
                $uibModalInstance.close($scope.selected.item);
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };

            $scope.save = function (program) {
                var programs = [];
                var existing = $cookies.getObject('savedPrograms');
                if (existing == undefined) {
                    programs.push(program.Id);
                    $cookies.putObject('savedPrograms', programs);
                }
                else {
                    existing.push(program.Id);
                    $cookies.putObject('savedPrograms', existing);
                }

            };
        });

} ());


