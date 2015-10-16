app.controller('LoginCtrl', function($scope,$http, $window,$rootScope) {

   $scope.user = {};
   $scope.mensagem = ""; 
   var baseURL = "http://localhost:8080";
   $rootScope.currentUser = localStorage.currentUser;

   $scope.login = function(user) {
   $http.post(baseURL+'/api/open/login', user).success(function(response,status, headers, config) {

	 localStorage.token = headers('Authorization');
	  $http.defaults.headers.common['Authorization'] = localStorage.token;
       $window.localStorage.currentUser = response.email;
       $rootScope.currentUser = localStorage.currentUser;
       $scope.user = {};
       $window.location.href = '#/';
      
	    }).error(function(error){
            $scope.mensagem = error.message;
         });
};

  $scope.register = function(user) {
 	$http.post(baseURL+'/api/open/account',user)
	.success(function(data){
	    $scope.user = {};
	    $scope.mensagem = "User registered with suceess";
        //reseta o form
        $scope.registerForm.$setPristine();
        $scope.registerForm.$setUntouched();
            }).error(function(error){
            $scope.mensagem = error.message;
         });
};


 $scope.logout = function () {
 $http.put(baseURL+'/api/secured/logout').success(function(data){
     delete localStorage.token;
     delete localStorage.currentUser;
     $rootScope.currentUser = localStorage.currentUser;
     }).error(function(error){
     $scope.mensagem = error.message;
    });
  };

 $scope.isauthenticated = function() {
   return localStorage.token;
  };
 
});
