/*!
 * app.util.js
 *
 * A utility file that provides helper methods for error mesages, ajax calls, logging, etc...
 * Ajax function has been updated to return the jXHR object available in jQuery 1.5
 * Provides a window.log default function to prevent errors in browsers without a console.
 *
 * @author: Jeremy Burton (jeremy@select-interactive.com - www.select-interactive.com)
 * @copyright: 2012 Select Interactive, LLC
 */
(function( document, $ ) {
    window.app = window.app || {};

    app.ajax = function( wsUrl, wsData, callSuccess, callFailure ) {
        return $.ajax({
            type: 'POST',
            cache: false,
            url: wsUrl,
            data: wsData,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: callSuccess,
            error: callFailure
        });
    };

    // test for JSON in the browser
    // if not supported (ie7), load JSON.js
    Modernizr.load({
        test: window.JSON,
        nope: '/js/JSON.js'
    });
})( document, jQuery );

// Set a defualt window.log function to prevent error in browsers without a console - IE.
window.log = function(){
    log.history = log.history || [];
    log.history.push( arguments );
    if ( this.console ) {
        arguments.callee = arguments.callee.caller;
        var newarr = [].slice.call( arguments );
        ( typeof console.log === 'object' ? log.apply.call( console.log, console, newarr ) : console.log.apply( console, newarr ) );
    }
};

// make it safe to use console.log always
(function(b){function c(){}for(var d="assert,clear,count,debug,dir,dirxml,error,exception,firebug,group,groupCollapsed,groupEnd,info,log,memoryProfile,memoryProfileEnd,profile,profileEnd,table,time,timeEnd,timeStamp,trace,warn".split(","),a;a=d.pop();){b[a]=b[a]||c}})((function(){try
{console.log();return window.console;}catch(err){return window.console={};}})());