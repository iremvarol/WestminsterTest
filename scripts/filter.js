(function () {
    "use strict";
    angular.module("program.filter", []).filter("programFilter",
        function () {
            return function (items, filter, savedPrograms, disciplineFilter) {
                 var filtered = [];
                if (filter.showSaved) {
                    angular.forEach(items, function (item) {

                        if (savedPrograms.indexOf(item.Id) != -1) {
                             filtered.push(item);

                        }
                    });
                    
                    return filtered;
                }

                if (filter.ug == true && filter.gr == true && filter.major == true && filter.minor == true && filter.course == true && filter.pro == true && disciplineFilter.length == 0) {
                    return items;
                }
               
                angular.forEach(items, function (item) {
                    var add = true;
                    if (!filter.ug)
                        if ( checkLevel(item, "Undergraduate"))
                            add = false;
                    if (!filter.gr)
                        if ( checkLevel(item, "Graduate"))
                            add = false;
                    if (filter.pro)
                        if ( checkLevel(item, "Professional"))
                            add = true;
                    if (!filter.major)
                        if ((item.TaxonomyProgramType.Text == "Major"))
                            add = false;
                    if (!filter.minor)
                        if ((item.TaxonomyProgramType.Text == "Minor"))
                            add = false;
                    if (!filter.course)
                        if ((item.TaxonomyProgramType.Text == "Advising Path"))
                            add = false;
                    if(disciplineFilter.length > 0 && add == true)
                    {
                         add = false;
                         angular.forEach(item.TaxonomyProgramDiscipline, function (discipline) {
                             if(disciplineFilter.indexOf(discipline.Text) != -1)
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

        function checkLevel(program,level) {
            var ret = false;
            angular.forEach(program.TaxonomyAcademicLevel2, function (item) {
                if (item.Text == level) {
                    ret = true;
                }
            })
         return ret;
        };
           
} ());


