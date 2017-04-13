(function () {
    'use strict';
 
    angular
        .module('myApp')
        .controller('LoginController', LoginController);
 
    LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService','UserService'];
    function LoginController($location, AuthenticationService, FlashService, UserService) {
        var vm = this;
 
        vm.login = login;
 
        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();
 
        function login() {
            vm.dataLoading = true;
            AuthenticationService.Login(vm.userName, vm.passWord, function (response) {
            	console.log(response.user.status);
                if (response.user.status==200) {
                    AuthenticationService.SetCredentials(vm.userName, vm.passWord);
                    if(response.user.data.role == 'Admin'){
                    	 $location.path('/welcomeadmin');
                    	
                    	 
                    }else
                    	{
                    	 $location.path('/'); 
                    	}
                   
                } else {
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });
        };
    }
    

    
    
 
})();