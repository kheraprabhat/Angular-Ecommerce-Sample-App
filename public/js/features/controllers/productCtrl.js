require(['Ralph'], function(Ralph){
	Ralph.controller('productCtrl', ['$scope', '$http', 'utility', function(scope, http, utility){
		scope.selectedProduct = utility.getData('selectedProductDetails');
	}]);
});