require(["Ralph"], function(Ralph) {
    Ralph.factory("categoryFilters", ["utility", function(utility) {
        var _pvtVariables = {},
            _pvtMethods = {
                initFilterForSelectedCategoryProducts: function(scope) {
                    scope.brandsForSelectedcategoryProducts = utility.getCategoryFilters({
                        name: "brandsForSelectedcategoryProducts",
                        key: "brand",
                        data: utility.getData("allProductsForSelectedcategory")
                    });
                    scope.sectionForSelectedcategoryProducts = utility.getCategoryFilters({
                        name: "sectionForSelectedcategoryProducts",
                        key: "productType",
                        data: utility.getData("allProductsForSelectedcategory")
                    });
                    scope.typesForSelectedcategoryProducts = utility.getCategoryFilters({
                        name: "typesForSelectedcategoryProducts",
                        key: "type",
                        data: utility.getData("allProductsForSelectedcategory")
                    });
                    scope.ratingForSelectedcategoryProducts = utility.getCategoryFilters({
                        name: "ratingForSelectedcategoryProducts",
                        key: "rating",
                        data: utility.getData("allProductsForSelectedcategory")
                    });
                }
            };
        return _pvtMethods;
    }]);
});
