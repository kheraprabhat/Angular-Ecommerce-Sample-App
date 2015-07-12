require(['Ralph'], function(Ralph){
	Ralph.controller('breadcrumbCtrl', ['$scope', '$location', 'utility', function(scope, location, utility){
		scope.breadcrumbList = utility.breadcrumb(location.path());
	}]);
});