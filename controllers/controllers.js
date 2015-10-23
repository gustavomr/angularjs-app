app.controller('LoginCtrl', function($scope,$http, $window,$rootScope,jwtHelper) {

   $scope.user = {};
   $scope.mensagem = ""; 
   var baseURL = "http://localhost:8080";
   $rootScope.currentUser = localStorage.currentUser;

   $scope.login = function(user) {
   $http.post(baseURL+'/api/open/login', user).success(function(response,status, headers, config) {

	 localStorage.token = headers('Authorization');
	  $http.defaults.headers.common['Authorization'] = localStorage.token;
       $window.localStorage.currentUser = jwtHelper.decodeToken(localStorage.token).email;
       console.log();
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
    
    $scope.forgotpassword = function(user) {
  	$http.put(baseURL+'/api/open/account/password/send-reset-link?email='+user.email)
	.success(function(data){
	    $scope.mensagem = "An email was sent to " + user.email + " your email with reset link";
        //reseta o form
        $scope.forgotForm.$setPristine();
        $scope.forgotForm.$setUntouched();
            }).error(function(error){
      //     console(user.email);
            $scope.mensagem = error.message;
         });
};
    
        $scope.teste = function(user) {
            
  	$http.get(baseURL+'/api/status')
	.success(function(data){
            }).error(function(error){
      //     console(user.email);
            $scope.mensagem = error.message;
         });
};
    
  
 $scope.logout = function () {
 $http.put(baseURL+'/api/secured/logout').success(function(data){
     delete localStorage.token;
     delete localStorage.currentUser;
     $rootScope.currentUser = localStorage.currentUser;
     $window.location.href = '#/signin';
     }).error(function(error){
     $scope.mensagem = error.message;
    });
  };

 $scope.isauthenticated = function() {
   return localStorage.token;
  };
 
});
