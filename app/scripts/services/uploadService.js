'use strict';

/**
 * @ngdoc service
 * @name AulaVirtualApp.fileReader
 * @description
 * # fileReader
 * Factory in the AulaVirtualApp.
 */
angular.module('AulaVirtualApp')
  // .service('multipartForm', ['$http', function($http){
  //   this.post = function(uploadUrl, data){
  //       var fd = new FormData();
  //       for(var key in data)
  //           fd.append(key, data[key]);
  //       $http.post(uploadUrl, fd, {
  //           transformRequest: angular.identity,
  //           headers: { 'Content-Type': undefined }
  //       });
  //   }
  // }])
.factory("fileReader", function($q, $log) {
  var onLoad = function(reader, deferred, scope) {
    return function() {
      scope.$apply(function() {
        deferred.resolve(reader.result);
      });
    };
  };

  var onError = function(reader, deferred, scope) {
    return function() {
      scope.$apply(function() {
        deferred.reject(reader.result);
      });
    };
  };

  var onProgress = function(reader, scope) {
    return function(event) {
      scope.$broadcast("fileProgress", {
        total: event.total,
        loaded: event.loaded
      });
    };
  };

  var getReader = function(deferred, scope) {
    var reader = new FileReader();
    reader.onload = onLoad(reader, deferred, scope);
    reader.onerror = onError(reader, deferred, scope);
    reader.onprogress = onProgress(reader, scope);
    return reader;
  };

  var readAsDataURL = function(file, scope) {
    var deferred = $q.defer();

    var reader = getReader(deferred, scope);
    reader.readAsDataURL(file);

    return deferred.promise;
  };

  return {
    readAsDataUrl: readAsDataURL
  };
});