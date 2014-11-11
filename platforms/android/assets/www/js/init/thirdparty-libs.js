/**
 * Third party libraries have to be declared here.
 */
define([
    'jquery',
    'angular'
], function (
        $,
        angular
    ) {
        
        // jQuery has to be exposed explicitly
        window.jQuery = $;
    });