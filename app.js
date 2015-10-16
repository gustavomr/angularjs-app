var app = angular.module('app',['ngRoute','ngMessages']);
 
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
      if ($window.sessionStorage.token) {
        config.headers.Authorization = $window.sessionStorage.token;
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

app.run(function(){
    if( sessionStorage.currentUser != null)
        {
            $rootScope.currentUser = sessionStorage.currentUser;        
        }
});
