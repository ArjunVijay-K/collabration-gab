'use strict';
 
angular.module('myApp').factory('AdminService', ['$http', '$q', function($http, $q){
 
    var REST_SERVICE_URI = 'http://localhost:8030/CollaborationBack/admins/';
 
    var factory = {
        fetchAllAdmins: fetchAllAdmins,
        createAdmin: createAdmin,
        updateAdmin:updateAdmin,
        deleteAdmin:deleteAdmin, 
        GetByAdminname : GetByAdminname
    };
 
    return factory;
  
    function fetchAllAdmins() {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while fetching Admins');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
    
    

    function createAdmin(admin) {
        var deferred = $q.defer();
        $http.post(REST_SERVICE_URI, admin)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('in service Error while creating Admin');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
 
 
    function updateAdmin(admin, id) {
        var deferred = $q.defer();
        $http.put(REST_SERVICE_URI+id, admin)
            .then(
            function (response) {
            	console.log(REST_SERVICE_URI + id);
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while updating Admin');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
 
    function deleteAdmin(id) {
        var deferred = $q.defer(); 
        $http.delete(REST_SERVICE_URI + id)
            .then( 
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while deleting Admin');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
    
    function GetByAdminname(adminname) {
        return $http.get(REST_SERVICE_URI+adminname).then(handleSuccess, handleError('Error getting admin by adminname'));
    }
    
    // private functions  
    
    function handleSuccess(res) {
        return res;
    }

    function handleError(error) {
        return function () {
            return { success: false, message: error };
        };
    }
}]);
 