require(['Ralph'], function(Ralph){
	Ralph.controller('homePageCtrl', ['$scope', 'utility', function(scope, utility){
		scope.headingText = 'Welcome to Home Page';
		scope.breadcrumb = [{
				name: 'home',
				link: '/'
			}, {
				name: 'category',
				link: '/category'
			}];
	}]);
});