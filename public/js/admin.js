require.config({
    baseUrl:    '/js',
    urlArgs:    "bust=" +  (new Date()).getTime(),
    paths: {
        'jquery'    : 'jquery-2.0.3.min',
        'angular'   : 'angular.min',
        'app'       : 'app',
        'views'     : 'app/views',
        'models'    : 'app/models',
        'collections':'app/collections'
    }
})

require(['jquery', 'angular', 'domReady', 'socket'],

    function($, Angular, domReady, socket){

        domReady(function(){

        })

        return this

    }
)