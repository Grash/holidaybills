require.config({
    paths: {
        jquery: '../libs/jquery-1.9.1.min',
        jqueryui: '../libs/jquery-ui-1.10.4',
        angular: '../libs/angular',
        nganimate: '../libs/angular-animate',
        ngroute: '../libs/angular-route',
        ngcarousel: '../libs/angular-carousel',
        ngtouch: '../libs/angular-touch'
    },
    shim: {
        "angular": {
            exports: 'angular'
        }
    }
});

require(['thirdparty-libs'], function () {
        require(['angular-modules'], function () {
            require(['main-module'], function() {
                require(['tripbill-modules'], function () {
                    angular.bootstrap(document, ['tripBill']); //manually bootstrap angular, on Dom ready
                });
            });
        });
});