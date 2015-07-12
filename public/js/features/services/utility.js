require(['Ralph'], function(Ralph){
	Ralph.factory('utility', ['$http', function(http){
		var _pvtVariables = {}, 
		_pvtMethods = {
			filters: {},
			isDefined: function(property){
				return typeof property !== 'undefined';
			},

			isObejctInArray: function(myArray, searchTerm, property) {
			    for(var i = 0, len = myArray.length; i < len; i++) {
			        if (myArray[i][property] === searchTerm) return i;
			    }
			    return -1;
			},

			getJsonData: function(serviveName, params){
				return http.get(serviveName, params || {});
			},

			setData: function(propertyName, data){
				return propertyName && data ? ((_pvtVariables[propertyName] = data), _pvtVariables[propertyName]) : null;
			},

			getData: function(propertyName){
				return propertyName && _pvtVariables[propertyName] ? _pvtVariables[propertyName] : null;
			},

			breadcrumb: function(breadcrumbString){
				var _breadcrumbList = '#/';
				breadcrumbString = breadcrumbString === '/' ? [''] : (breadcrumbString || '').split('/');
				
				angular.forEach(breadcrumbString, function(breadcrumbName, breadcrumbIndex){
					_breadcrumbList = _breadcrumbList + (breadcrumbName ? (breadcrumbName + '/') : '');
					breadcrumbString[breadcrumbIndex] = {
						'name': breadcrumbName || 'home',
						'link': _breadcrumbList,
						'clickable': breadcrumbString.length -1 !== breadcrumbIndex
					};
				});

				return breadcrumbString;
			},

			getCategoryData: function(serviveName, parameters){
				return _pvtVariables[serviveName] ? _pvtVariables[serviveName] : http.get(serviveName, parameters || {});
			},

			getCategoryFilters: function(filterDetails){
				var _categoryFilters = [];
				filterDetails.data.forEach(function(selected, index){
					_pvtMethods.isObejctInArray(_categoryFilters, selected[filterDetails.key], 'name') === -1 && _categoryFilters.push({
						'included': false,
						'name': selected[filterDetails.key]
					});
				});
				return _categoryFilters;
			}
		};

		return _pvtMethods;
	}]);
});