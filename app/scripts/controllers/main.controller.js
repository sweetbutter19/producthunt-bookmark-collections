'use strict';

angular.module('bookmark-collections').controller('MainController', ['$scope', 'StorageService', function($scope, StorageService) {
	$scope.bookmarks = StorageService.get().reverse();

	$scope.remove = function(url) {
		StorageService.remove(url);
		$scope.bookmarks = StorageService.get();

		if(!$scope.$$phase) {
			$scope.$apply();
		}
	};

}]);
