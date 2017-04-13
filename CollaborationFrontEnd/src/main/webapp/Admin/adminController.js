'use strict';
 
angular.module('myApp').controller('AdminController', ['$scope', '$location', 'AdminService', function($scope, $location, AdminService) {
    
	var self = this;
	self.admin={adminId:'',adminName:'',role:'',emailId:'',phoneNo:'',passWord:'',address:'',zipCode:''};
    self.admins=[];
    
    self.submit = submit;
    self.edit = edit;
    self.remove = remove;
    self.reset = reset; 
    

    fetchAllAdmins();
    reset();

    function fetchAllAdmins(){
        AdminService.fetchAllAdmins()
            .then(
            function(d) {
                self.admins = d;
            },
            function(errResponse){
                console.error('Error while fetching Admins');
            }
        );
    }
    function createAdmin(admin){
        AdminService.createAdmin(admin)
            .then(
            		 $location.path('/login'),
            		$scope.message="your are successfully Registered",
            		
            		fetchAllAdmins,
           
            function(errResponse){
                console.error('Error while creating Admin');
            }
        );
    }
 
    function updateAdmin(admin, id){
        AdminService.updateAdmin(admin, id)
            .then(
            fetchAllAdmins,
            function(errResponse){
                console.error('Error while updating Admin');
            }
        );
    }
    
    function deleteAdmin(id){
        AdminService.deleteAdmin(id)
            .then(
            fetchAllAdmins,
            function(errResponse){
                console.error('Error while deleting Admin');
            }
        );
    }
 
    function submit() {
        if(self.admin.adminId===null){
            console.log('Saving New Admin', self.admins);
            createAdmin(self.admin);
        }else{
            updateAdmin(self.admin, self.admin.adminId);
            console.log('Admin updated with id ', self.admins.adminId);
        }
        reset();
    }
 
    function edit(id){
        console.log('id to be edited', id);
        for(var i = 0; i < self.admins.length; i++){
            if(self.admins[i].adminId === id) {
                self.admin = angular.copy(self.admins[i]);
                break;
            }
        }
    }
 
    function remove(id){
        console.log('id to be deleted', id);
        if(self.admin.adminId === id) {//clean form if the admin to be deleted is shown there.
            reset();
        }
        deleteAdmin(id);
    }
 
 
    function reset(){
    	self.admin={adminId:null,adminName:'',role:'',emailId:'',phoneNo:'',passWord:'',address:'',zipCode:''};
       
        //$scope.myForm.$setPristine(); //reset Form
    }
}]);