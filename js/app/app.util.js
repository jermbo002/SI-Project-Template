/*!
 * app.util.js
 *
 * A utility file that provides helper methods for error mesages, ajax calls, logging, etc...
 * Ajax function has been updated to return the jXHR object available in jQuery 1.5
 * Provides a window.log default function to prevent errors in browsers without a console.
 *
 * @author: Jeremy Burton (jeremy@select-interactive.com - www.select-interactive.com)
 */
(function( document, $ ) {
    window.app = window.app || {};

    app.ajax = function( wsUrl, wsData, callSuccess, callFailure, async ) {
        async = async === undefined ? true : async;

        return $.ajax({
            async: async,
            cache: false,
            contentType: 'application/json; charset=utf-8',
            data: wsData,
            error: callFailure,
            success: callSuccess,
            dataType: 'json',
            type: 'POST',
            url: wsUrl
        });
    };

    // test for JSON in the browser
    // if not supported (ie7), load JSON.js
    Modernizr.load({
        test: window.JSON,
        nope: '/js/libs/JSON.js'
    });
}( document, jQuery ) );

// Set a defualt window.log function to prevent error in browsers without a console - IE.
window.log = function f() {
    log.history = log.history || [];
    log.history.push(arguments);
    if (this.console) {
        var args = arguments;
        var newarr;

        try {
            args.callee = f.caller;
        } catch(e) {

        }

        newarr = [].slice.call(args);

        if (typeof console.log === 'object') {
            log.apply.call(console.log, console, newarr);
        } else {
            console.log.apply(console, newarr);
        }
    }
};

// make it safe to use console.log always
(function(a) {
    function b() {}
    var c = "assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn";
    var d;
    for (c = c.split(","); !!(d = c.pop());) {
        a[d] = a[d] || b;
    }
})(function() {
    try {
        console.log();
        return window.console;
    } catch(a) {
        return (window.console = {});
    }
}());