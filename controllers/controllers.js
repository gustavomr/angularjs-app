app.controller('LoginCtrl', function($scope,$http, $window,$rootScope) {

   $scope.user = {};
   $scope.mensagem = ""; 
   var baseURL = "http://localhost:8080";
   $rootScope.currentUser = sessionStorage.currentUser;

   $scope.login = function(user) {
   $http.post(baseURL+'/api/open/login', user).success(function(response,status, headers, config) {

	 sessionStorage.token = headers('Authorization');
	  $http.defaults.headers.common['Authorization'] = sessionStorage.token;
		 $window.sessionStorage.currentUser = response.email;
		$rootScope.currentUser = sessionStorage.currentUser;
 		 $window.location.href = '#';
	    }).error(function(error){
            $scope.mensagem = error.message;
         });
};

  $scope.register = function(user) {
 	$http.post(baseURL+'/api/open/account',user)
	.success(function(data){
	    $scope.user = {};
	    $scope.mensagem = "User registered with suceess";
            $window.location.href = '#about';
            }).error(function(error){
            $scope.mensagem = error.message;
         });
};


 $scope.logout = function () {
 $http.put(baseURL+'/api/secured/logout').success(function(data){
     delete sessionStorage.token;
     delete sessionStorage.currentUser;
     $rootScope.currentUser = sessionStorage.currentUser;
     }).error(function(error){
     $scope.mensagem = error.message;
    });
  };

 $scope.isauthenticated = function() {
   return sessionStorage.token;
  };
 
});
