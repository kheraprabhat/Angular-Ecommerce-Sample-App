require(['Ralph', 'jquery', './features/services/categoryFilters'], function(Ralph, categoryFilters) {
    Ralph.controller('categoryCtrl', ['$scope', 'utility', 'categoryFilters', function(scope, utility, categoryFilters) {
        // define private variables
        var _brandFilterNames = {};

        // define scope variables for category controller
        scope.allProductsForSelectedcategory = [];
        scope.brandsForSelectedcategoryProducts = [];
        scope.sectionForSelectedcategoryProducts = [];
        scope.typesForSelectedcategoryProducts = [];
        scope.ratingForSelectedcategoryProducts = [];

        // everytime user add a filter, value should be added in filter collection
        scope.addIntoFilterList = function(filterDetails, filterName) {
            // if filter is not created yet, create new one
            if (!_brandFilterNames[filterName]) {
                _brandFilterNames[filterName] = [];
            }

            // category id is mandatory for every request, therefore putting categoryId in array format
            _brandFilterNames['categoryId'] = [utility.getData('activeCategoryId')];

            // if user remove / add filter option (true/false)
            if (filterDetails.included) {
                // if need to be added into filter list
                // and if filter is not in the already created list
                if (_brandFilterNames[filterName].indexOf(filterDetails.name) === -1) {
                    _brandFilterNames[filterName].push(filterDetails.name);
                }
            } else {
                // if not then push into filter collection
                _brandFilterNames[filterName].splice(_brandFilterNames[filterName].indexOf(filterDetails.name), 1);
            }

            // init ajax request (get request) to get the filterd products from mongodb
            utility.getJsonData('/products', {
                params: _brandFilterNames
            }).then(function(response) {
                // once data received, update scope's allProductsForSelectedcategory collection
                scope.allProductsForSelectedcategory = response.data;
            });
        };

        // while working on category page if anytime category id is required
        // created a global object property for future use
        // utility.getData('activeCategoryId') // returns ==> active category _id
        scope.getSelectedCategoryId = function() {
            return utility.getData('activeCategoryId');
        };

        // save / store clicked product details for product page reference to reduce ajax request on product page
        scope.selectedProductDetails = function(selectedProductDetails) {
            utility.setData('selectedProductDetails', selectedProductDetails);
        };

        // set watcher to get updated value on category change
        scope.$watch(function() {
            return utility.getData('allProductsForSelectedcategory');
        }, function(newValue, oldValue) {
            if (oldValue !== newValue) {
                // if value getting updated, update the filters as well for current category
                scope.allProductsForSelectedcategory = newValue;
                categoryFilters.initFilterForSelectedCategoryProducts(scope);
            }
        });
    }]);
});
