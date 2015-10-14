var app = angular.module('app',['angular-jwt'])

.controller('LoginCtrl', function($scope,$http,jwtHelper) {

  $scope.login = function(username, password) {
   $http.post('http://test-routes.herokuapp.com/auth' + '/login', {
      username: $scope.username,
      password: $scope.password
    }).success(function(response,status, headers, config) {
         // console.log(headers('Server'));
	  sessionStorage.token = response.token;
	   $http.defaults.headers.common['Authorization'] = "token " +   
                      sessionStorage.token;
	console.log(response.token);
    })

};

$scope.register = function(username, password) {
   $http.post('http://test-routes.herokuapp.com/auth' + '/register', {
      username: $scope.username,
      password: $scope.password
    })
};


 $scope.logout = function () {
    delete sessionStorage.token;
  };

 $scope.isauthenticated = function() {
   return sessionStorage.token;
  };
 
});


app.factory('authInterceptor', function ($rootScope, $q, $window) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if ($window.sessionStorage.token) {
        config.headers.Authorization = 'token ' + $window.sessionStorage.token;
      }
      return config;
    },
    responseError: function (rejection) {
      if (rejection.status === 401) {
        // handle the case where the user is not authenticated
      }
      return $q.reject(rejection);
    }
  };
});

app.config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});
