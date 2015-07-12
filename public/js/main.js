require.config({
    baseUrl: 'js',
    paths: { 
        angular: './libs/angular', 
        angularrouter: './libs/angular-route',
        jquery: './libs/jquery'
    },
    shim: { 
    	angular: { exports: 'angular' },
        jquery: { exports: '$' },
        angularrouter: { deps: ["angular"], exports: 'angularrouter' }
    }
});

require([
    './ralph',
    './angularrouter',
    './features/ralphRouter',
    './features/services/utility',

    './features/directives/breadcrumb',

    './features/controllers/ralphCtrl',
    './features/controllers/headerCtrl',
    
    './features/controllers/homePageCtrl',
    
    './features/controllers/categoryCtrl',
    
    './features/controllers/breadcrumbCtrl',

    './features/controllers/productCtrl'
], function(Ralph) {
    angular.bootstrap(document, ['RALPH']);
});