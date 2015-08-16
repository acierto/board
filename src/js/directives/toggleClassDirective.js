board.directive('toggleClass', function ($interval) {
    return {
        restrict: 'A',
        template: '<span ng-mousedown="select()" ng-mouseup="clear()" ng-class="selected ? \'taken-circle\' : \'free-circle\'"  ng-transclude></span>',
        replace: true,
        scope: {
            model: '='
        },
        transclude: true,
        link: function (scope, element, attrs) {
            var stop;
            scope.model = {};

            scope.clear = function () {
                scope.model.value = undefined;
                if (stop) {
                    $interval.cancel(stop);
                }
                scope.$parent.showModal = undefined;
            };

            scope.select = function () {
                var count = 0;
                stop = $interval(function() {
                    if (count > 3) {
                        scope.$parent.showModal = scope.$id;
                        $interval.cancel(stop);
                    } else {
                        count++;
                    }
                }, 200);

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