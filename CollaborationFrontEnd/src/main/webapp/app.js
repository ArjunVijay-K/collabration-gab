(function () {
    'use strict';
 
    angular
        .module('myApp', ['ngRoute', 'ngCookies'])
        .config(config)
        .run(run);
 
    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider
        .when('/',{
    		templateUrl : 'home/home.html',
    		
    		controller : 'UserController'
    		
    	})
    	
    	 .when('/welcomeadmin',{
    		templateUrl : 'Admin/admin.html',
    		controller : 'LoginController',
    			
    	})
    	
    	
    	 .when('/chat', {
               //controller: 'HomeController',
                templateUrl: 'chat/chat.html',
                
            })
        .when('/register', {
    		templateUrl : 'user/register.html',
    		controller : 'UserController',
    		controllerAs: 'ctrl'
    	})
    	.when('/login', {
    		 controller: 'LoginController',
             templateUrl: 'user/login.html',
             controllerAs: 'vm'
    	})
    	.when('/logout', {
    		 controller: 'LoginController',
             templateUrl: 'user/login.html',
             template: 'Your Are Successfully Logged out',
             controllerAs: 'vm',
            	
    	})
    	.when('/blog', {
    	templateUrl : 'c_blog/blog.html',
    	controller : 'BlogController',
    	controllerAs: 'blog'
    	})
    	
    	.when('/home',{
    		templateUrl : 'home/home.html',
    		controller : 'UserController'
    		
    	})
    	
    	.when('/forum', {
    	templateUrl : 'forum/forum.html',
    	controller : 'ForumController',
    	controllerAs: 'forum'
    	})

    	.when('/jobs',{
    	templateUrl : 'jobs/jobs.html',
    	controller : 'JobController',
    	controllerAs: 'job'
    	})
    	
    	.when('/Userjobs',{
    	templateUrl : 'jobs/Userjobs.html',
    	controller : 'JobController',
    	controllerAs: 'job'
    	})
    	
    	.when('/viewJobs',{
    	templateUrl : 'jobs/viewJobs.html',
    	controller : 'JobController',
    	controllerAs: 'job'
    	})

    	.when('/createBlog', {
    	templateUrl : 'c_blog/createBlog.html',
    	controller : 'BlogController',
    	controllerAs: 'bc'
    	})
    	.when('/viewBlog', {
    	templateUrl : 'c_blog/viewBlog.html',
    	controller : 'BlogController',
    	controllerAs: 'bc'
    	})
    	.when('/Adblog', {
    	templateUrl : 'c_blog/Adblog.html',
    	controller : 'BlogController',
    	controllerAs: 'bc'
    	})
    	
    	
    	.when('/createForum', {
    	templateUrl : 'forum/createForum.html',
    	controller : 'ForumController',
    	controllerAs: 'fc'
    	})
    	.when('/viewForum', {
    	templateUrl : 'forum/viewForum.html',
    	controller : 'ForumController',
    	controllerAs: 'fc'	
    	
    	})
    	.when('/createJob', {
    		templateUrl : 'jobs/createJobs.html',
    		controller : 'JobController',
    		controllerAs: 'jc'
    	})
    	
    	.when('/Adforum', {
    		templateUrl : 'forum/Adforum.html',
    		controller : 'ForumController',
    		controllerAs: 'fc'
    	})
    	/*.when('/editJob', {
    		templateUrl : 'jobs/editJobs.html',
    		controller : 'JobController',
    		controllerAs: 'jc'
    	})*/
    	.when('/About', {
    	templateUrl : 'user/About.html',
    	

    })
    	.otherwise( {
    		templateUrl : 'home/home.html',
    		controller : 'mainController'
    	});
    }
 
    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
    function run($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }
 
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/home','/login', '/register','/blog','/viewBlog','/forum','/jobs','/viewevents','/Adforum','/createJob','/Adblog','/editJob','','/']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            var loggedOut = false;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    }
 
})();
 