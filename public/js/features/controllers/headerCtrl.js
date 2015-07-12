require(['Ralph'], function(Ralph){
	Ralph.controller('headerCtrl', ['$scope', '$location', 'utility', function(scope, location, utility){
		scope.categoryList = [];
		utility.getJsonData('/category').then(function(response){
			scope.categoryList = response.data;
		});

		scope.getCategoryProducts = function(categoryId){
			utility.setData('activeCategoryId', categoryId);
			utility.getJsonData('/products', {params: {'categoryId': categoryId}}).then(function(response){
				utility.setData('allProductsForSelectedcategory', response.data);
			});
		};
	}]);
});