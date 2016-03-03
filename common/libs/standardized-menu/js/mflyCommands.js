/**
 * mflyCommands v1.1 | (c) 2013-2015, Mediafly, Inc.
 * mflyCommands is a singleton instance which wraps common mfly calls into a JavaScript object.
 * Before use, please be sure to call setPrefix if you are working on a development platform (e.g.
 * a local webserver on a PC) to override mfly:// with, for example, http://localhost:8000/ .
 */
var mflyCommands = function() {

    /**
     * Private variables and functions
     */

    var prefix = "mfly://";

    function _isWindows8() {
        var userAgent = navigator.userAgent.toLowerCase();
        if (userAgent.indexOf("msie") != -1) {
            if (userAgent.indexOf("webview") != -1) {
                return true;
            }
        }
        return false;
    }

    function doControlStatement(url) {
        if (_isWindows8()) {
            window.external.notify(url);
            return;
        }
        console.log('doControlStatement: ' + url);
        window.open(url);
    }

    // Internal, recursive function to handle retry logic
    function _internalEmbed(id, page, dfd) {
        var pagepos = (typeof page == 'undefined' || page == null) ? '' : '?position=' + page;

        $.ajax({
            url: prefix + "data/embed/" + id + pagepos,
            success: function (data, textStatus, request) {
                // Check for retry.
                // iOS returns 202. Due to system limitations, Android returns 200 + blank response body
                if (request.status === 202 || (request.status == 200 && !request.responseText)) {
                    // Suggested delay amount is set in the Retry-After header on iOS. Default to 3 seconds if not found.
                    var delayFor = request.getResponseHeader("Retry-After") || 3;
                    setTimeout(function () {
                        _internalEmbed(id, page, dfd);
                    }, delayFor * 1000);
                } else {
                    // Content retrieved. Resolve the promise.
                    dfd.resolveWith(this, [request.responseText, request.status]);
                }
            },
            error: function (data, status, request) {
                // Content could not be retrieved. Reject the promise.
                dfd.reject(this, [request.responseText, request.status]);
            }
        });
    }

    function _internalGetData(func, param, dfd) {
        $.ajax({
            dataType: 'json',
            url: prefix + "data/" + func + (param == null ? "" : "/" + param),
            success: function (data, textStatus, request) {
                // Content retrieved. Resolve the promise.
                dfd.resolveWith(this, [data, request.status]);
            },
            error: function (data, status, request) {
                // Content could not be retrieved. Reject the promise.
                dfd.reject(this, [request, data.status]);
            }
        });
    }

    function _internalPutData(key, value, dfd) {
        $.ajax({
            type: "GET",
            url: prefix + "data/info/" + key,
            contentType: "text/plain; charset=utf-8",
            data: "value=" + encodeURIComponent(value) + "&method=PUT",
            dataType: "text",
            success: function(data, textStatus, request) {
                // PUT successful. Resolve the promise.
                dfd.resolveWith(this, [data, request.status]);
            },
            error: function(data, status, request) {
                // PUT failed. Reject the promise.
                dfd.reject(this, [request, data.status]);
            }
        });
    }


    function _parseQueryParameters(x, y, w, h) {
        var qp = '?';
        if (typeof x != 'undefined') qp += 'x=' + x + '&';
        if (typeof y != 'undefined') qp += 'y=' + y + '&';
        if (typeof w != 'undefined') qp += 'w=' + w + '&';
        if (typeof h != 'undefined') qp += 'h=' + h + '&';
        if (qp.length > 1) { qp = qp.substr(0, qp.length - 1) } else { qp = '' }
        return qp;
    }

    /**
     * Public variables and functions
     */

    return {
        setPrefix: function (_prefix) {
            prefix = _prefix;
        },

        openItem: function (_id) {
            doControlStatement(prefix + "item/" + _id);
        },

        openFolder: function (_id) {
            doControlStatement(prefix + "folder/" + _id);
        },

        goto: function (_id) {
            doControlStatement(prefix + "control/goto/" + _id);
        },

        showControlBars: function () {
            doControlStatement(prefix + "control/showControlBars");
        },

        hideControlBars: function () {
            doControlStatement(prefix + "control/hideControlBars");
        },

        showSearch: function (_dimensions) {
            doControlStatement(prefix + "control/showSearch?" + _dimensions);
        },

        close: function () {
            doControlStatement(prefix + "control/done");
        },

        next: function () {
            doControlStatement(prefix + "control/next");
        },

        previous: function () {
            doControlStatement(prefix + "control/previous");
        },

        refresh: function () {
            doControlStatement(prefix + "control/refresh");
        },

        email: function (_id) {
            doControlStatement(prefix + "control/email/" + _id);
        },

        showSettings: function (x, y, w, h) {
            var qp = _parseQueryParameters(x, y, w, h);
            doControlStatement(prefix + "control/showSettings" + qp);
        },

        showDownloader: function (x, y, w, h) {
            var qp = _parseQueryParameters(x, y, w, h);
            doControlStatement(prefix + "control/showDownloader" + qp);
        },

        addToDownloader: function(id) {
            doControlStatement(prefix + "control/addToDownloader/" + id);
        },

        showAnnotations: function (x, y, w, h) {
            var qp = _parseQueryParameters(x, y, w, h);
            doControlStatement(prefix + "control/showAnnotations" + qp);
        },

        showCollections: function (x, y, w, h) {
            var qp = _parseQueryParameters(x, y, w, h);
            doControlStatement(prefix + "control/showCollections" + qp);
        },

        showAddToCollection: function (id, x, y, w, h) {
            var qp = _parseQueryParameters(x, y, w, h);
            doControlStatement(prefix + "control/showAddToCollection?id=" + id + qp.replace('?', '&'));
        },

        takeAndEmailScreenshot: function () {
            doControlStatement(prefix + "control/takeAndEmailScreenshot");
        },

        showSecondScreen: function () {
            doControlStatement(prefix + "control/secondScreenOptions");
        },

        /**
         * Get a JSON object with details of this item.
         * @param id Airship ID of the item/folder for which more information is requested.
         * @return a deferred that will resolve with a JSON object with details of this item/folder.
         */
        getItem: function(id) {
            return $.Deferred(function (dfd) {
                _internalGetData('item', id, dfd);
            });
        },

        /**
         * Get a JSON object with the contents of this folder.
         * @param id Airship ID of the folder for which more information is requested.
         * @return a deferred that will resolve with a JSON array with the contents of this folder.
         */
        getFolder: function(id) {
            return $.Deferred(function(dfd) {
                _internalGetData('folder', id, dfd);
            });
        },

        /**
         * Run the embed function and replace the src of jQuery element $e with the results.
         * @param $e jQuery element whose src element will get replace when the embeddable content
         * is ready for the Interactive.
         * @param id Airship ID of the item to embed.
         * @param page Page number for documents.
         */
        embed: function ($e, id, page) {
            $.Deferred(function (dfd) {
                _internalEmbed(id, page, dfd);
            }).done(function () {
                var pagepos = (typeof page == 'undefined' || page == null) ? '' : '?position=' + page;
                $e.attr('src', prefix + 'data/embed/' + id + pagepos);
            }).fail(function () {
                console.log('mflyCommands.js: embed failed. id='+id+' page='+page+' $e=', $e);
            });
        },

        /**
         * Get raw data of Interactive via the embed function.
         * @param id Airship ID of the item to embed. Currently limited to images and other Interactives
         * @return a deferred that will resolve with body and status code on completion.
         */
        getData: function (id) {
            return $.Deferred(function (dfd) {
                _internalEmbed(id, null, dfd);
            });
        },


        getValue: function (key) {
            return $.Deferred(function (dfd) {
                _internalGetData('info', key, dfd);
            });
        },
        getValues: function(prefix) {
            if (typeof prefix != 'undefined') {
                // Get values with specified prefix
                return $.Deferred(function (dfd) {
                    _internalGetData('info?prefix=' + prefix, null, dfd);
                });
            } else {
                // Get ALL values
                return $.Deferred(function (dfd) {
                    _internalGetData('info', null, dfd);
                });
            }
        },
        putValue: function (key, value) {
            return $.Deferred(function (dfd) {
                _internalPutData(key, value, dfd);
            });
        },


        getOnlineStatus: function() {
            return $.Deferred(function(dfd) {
                _internalGetData('onlineStatus', null, dfd);
            });
        },

        /**
         * Get the download status for all items if ID is not passed. If ID is passed, get the download
         * status for that item.
         * @param id
         */
        getDownloadStatus: function(id) {
            var idStr = '';
            if (arguments.length == 1) {
                idStr = "/" + id;
            }

            return $.Deferred(function(dfd) {
                _internalGetData('download/status' + idStr, null, dfd);
            });
        },

        /**
         * Get the list of collections
         * status for that item.
         */
        getCollections: function() {
            return $.Deferred(function(dfd) {
                _internalGetData('collections', null, dfd);
            });
        },


        /**
         * Do incremental search and return search results.
         */
         search: function(term) {
            return $.Deferred(function(dfd) {
                _internalGetData('search?term=' + term, null, dfd)
            });
        },

        isWindows8: function () {
            return _isWindows8();
        }
    }
}();