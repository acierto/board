board.controller('BoardController', function BoardController($scope) {

});

board.directive('toggleClass', function () {
    return {
        restrict: 'A',
        template: '<span ng-click="localFunction()" ng-class="selected ? \'taken-circle\' : \'free-circle\'"  ng-transclude></span>',
        replace: true,
        scope: {
            model: '='
        },
        transclude: true,
        link: function (scope, element, attrs) {
            scope.model = {};

            scope.localFunction = function () {
                if (!scope.model.value) {
                    scope.model.value = scope.$id;
                } else {
                    scope.model.value = undefined;
                }
            };
            scope.$watch('model.value', function () {
                if (scope.model.value && !scope.selected) {
                    scope.selected = "active";
                } else {
                    scope.selected = '';
                }
            });
        }
    };
});