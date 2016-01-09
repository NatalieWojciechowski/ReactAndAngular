var app = angular.module('App', ['react'])

.controller('mainCtrl', ['$scope', '$location', function($scope, $location) {
  $scope.development = false;

  if($location && $location.host() == "localhost" ) {
    if($location.port() == "8000")
      $scope.development = true;
  }
}])

.directive('loadBar', [function() {
  return {
    restrict: 'A',
    scope: true,
    template:
    '<div class="loading-bar">'+
    '  <img src="../assets/images/ajax-loader.gif">'+
    '  <div class="message">Loading... Please Wait</div>'+
    '</div>',
    link: function(scope, element, attr, controller) {

    }
  };
}]);
