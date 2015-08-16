board.directive('toggleClass', function ($interval) {
    return {
        restrict: 'A',
        template: '<span ng-tap ng-class="selected ? \'taken-circle\' : \'free-circle\'"  ng-transclude></span>',
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

                if (!scope.model.value) {
                    scope.model.value = scope.$id;
                } else {
                    scope.model.value = undefined;
                }

                stop = $interval(function() {
                    if (count > 100) {
                        scope.$parent.showModal = scope.$id;
                        $interval.cancel(stop);
                    } else {
                        count++;
                    }
                }, 10);
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

board.directive("ngTap", function() {
    return function($scope, $element, $attributes) {
        var tapped;
        tapped = false;
        $element.bind("click", function() {
            if (!tapped) {
                return $scope.$apply($attributes["ngTap"]);
            }
        });
        $element.bind("touchstart", function(event) {
            $scope.select();
            return tapped = true;
        });
        $element.bind("touchmove", function(event) {
            tapped = false;
            return event.stopImmediatePropagation();
        });
        return $element.bind("touchend", function() {
            //alert("touchend");
            $scope.clear();
            if (tapped) {
                return $scope.$apply($attributes["ngTap"]);
            }
        });
    };
});