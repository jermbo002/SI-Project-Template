/*!
 * util.js
 *
 * A utility file that provides helper methods for error mesages, ajax calls, logging, etc...
 * Ajax function has been updated to return the jXHR object available in jQuery 1.5
 * Provides a window.log default function to prevent errors in browsers without a console.
 *
 * @author: Jeremy Burton (jeremy@select-interactive.com - www.select-interactive.com)
 */
(function( document, $ ) {
    window.app = window.app || {};

    app.ajax = function( wsUrl, wsData, callSuccess, callFailure ) {
        if ( typeof wsData !== 'string' ) {
            wsData = JSON.stringify( wsData );
        }

        return $.ajax({
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
}( document, jQuery ) );

// Avoid 'console' errors in browsers that lack a console
if ( !( window.console && console.log ) ) {
    (function() {
        var noop = function() {},
            methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'],
            length = methods.length,
            console = window.console = {};
        while ( length-- ) {
            console[methods[length]] = noop;
        }
    }());
}