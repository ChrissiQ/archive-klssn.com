define(['jquery', 'underscore', 'backbone', 'models/block', 'views/canvas'],

    function($, _, Backbone, Block, canvas){

        var BlockCollection = Backbone.Collection.extend({
            initialize: function () {
                var blocks = this
                canvas.on('render', function(){
                    blocks.render()
                })
            },

            model: Block,

            url: "/blocks",

            render: function () {
                this.models.forEach(function (block) {
                    block.render()
                })
            }
        });

        return new BlockCollection()
    }

);