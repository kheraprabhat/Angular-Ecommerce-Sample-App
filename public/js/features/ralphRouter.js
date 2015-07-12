require(['Ralph'], function(Ralph){
	Ralph.config(['$routeProvider',function(router) {
		router.when('/', {
			templateUrl: './include/home.html',
			controller: 'homePageCtrl'
		}).when('/category', {
			templateUrl: './include/category/category.html',
			controller: 'categoryCtrl'
		}).when('/category/:category', {
			templateUrl: './include/category/category.html',
			controller: 'categoryCtrl'
		}).when('/category/:category/:productId', {
			templateUrl: './include/product/product.html',
			controller: 'productCtrl'
		}).otherwise({
			redirectTo: '/'
		});
	}]);
});