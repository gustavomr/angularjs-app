app.controller('ProfileCtrl', ['$scope','$http','baseURL', function($scope,$http,baseURL) {
  $scope.$on('$viewContentLoaded', function() {
      
       $http.get(baseURL+'/api/status').success(function(response,status, headers, config) {
       $scope.user = {};
      
	    }).error(function(error){
            $scope.mensagem = error.message;
         });
     
  });
}]);