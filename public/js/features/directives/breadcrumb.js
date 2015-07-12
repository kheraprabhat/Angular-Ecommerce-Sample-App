require(['Ralph'], function(Ralph){
	Ralph.directive('breadcrumb', [function(){
		return {
			restrict: 'EA',
			scope: {
				"source": "=source"
			},
			controller: 'breadcrumbCtrl',
			templateUrl: './include/breadcrumb.html',
			link: function _breadcrumb (scope, element, attrs){

			}
		};
	}]);
});