var app = angular.module('app',['ngRoute','ngMessages','angular-jwt']);
 
app.config(function($httpProvider,$routeProvider)
{
   //
   $httpProvider.interceptors.push('authInterceptor');

   $routeProvider
   .when('/signin', {
      templateUrl : 'signin/signin.html',
      controller  : 'LoginCtrl',
   })
    
 .when('/register', {
      templateUrl : 'register/register.html',
      controller  : 'LoginCtrl',
   })
   
   .when('/request', {
      templateUrl : 'request/request.html',
      controller  : 'LoginCtrl',
      secure: true 
   })
   
.when('/forgotpassword', {
      templateUrl : 'forgotpassword/forgotpassword.html',
      controller  : 'LoginCtrl',
   })

   .when('/about', {
      templateUrl : 'about/about.html',
      controller  : 'LoginCtrl',
   })
 
   // caso não seja nenhum desses, redirecione para a rota '/'
   .otherwise ({ redirectTo: '/' });
});

// envia a authorização em cada POST, PUT, GET...
app.factory('authInterceptor', function ($rootScope, $q, $window) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if ($window.localStorage.token) {
        config.headers.Authorization = $window.localStorage.token;
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

app.directive("passwordVerify", function() {
   return {
      require: "ngModel",
      scope: {
        passwordVerify: '='
      },
      link: function(scope, element, attrs, ctrl) {
        scope.$watch(function() {
            var combined;

            if (scope.passwordVerify || ctrl.$viewValue) {
               combined = scope.passwordVerify + '_' + ctrl.$viewValue; 
            }                    
            return combined;
        }, function(value) {
            if (value) {
                ctrl.$parsers.unshift(function(viewValue) {
                    var origin = scope.passwordVerify;
                    if (origin !== viewValue) {
                        ctrl.$setValidity("passwordVerify", false);
                        return undefined;
                    } else {
                        ctrl.$setValidity("passwordVerify", true);
                        return viewValue;
                    }
                });
            }
        });
     }
   };
});

app.run(function($rootScope,$location,jwtHelper){
    
  //se token expirado, deleta token e redireciona para o login
  if (jwtHelper.isTokenExpired(localStorage.token)) {
        delete localStorage.token;
        delete localStorage.currentUser;
        $location.path("/signin");
  }
   
  // inicializa o usuário logado    
  if( localStorage.currentUser != null)
  {
      $rootScope.currentUser = localStorage.currentUser;        
  }
  
    //verifica se o usuário está logado, se não estiver redireciona para o login
    $rootScope.$on('$routeChangeSuccess', function (event, next, current) {
  
  if (next && next.$$route && next.$$route.secure) {
        if (!localStorage.currentUser) {
             $location.path("/signin");
        }
  }
   
  });

});
