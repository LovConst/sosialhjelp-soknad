angular.module('nav.kravdialogbp.informasjonsside')
    .directive('startSoknadButton', function (soknadService) {
        return {
            replace: true,
            templateUrl: 'js/informasjonsside/templates/startSoknadButtonTemplate.html',
            link: function (scope) {
                scope.startSoknad = function () {
                    if (feilliste.length === 0) {
                        scope.fremdriftsindikator = {
                            laster: true
                        };

                        var skjemanummer = "NAV 04-16.01";

                        soknadService.create({soknadType: skjemanummer}).$promise.then(function (soknad) {
                                console.log("STARTET SØKNAD!", soknad);
                            })
                            .catch(function () {
                                scope.fremdriftsindikator.laster = false;
                            });
                    }
                };
            }
        };
    });