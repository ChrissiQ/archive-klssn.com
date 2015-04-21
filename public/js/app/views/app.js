define(['jquery', 'underscore', 'backbone', 'views/canvas', 'collections/blocks', 'socket'],

    function($, _, Backbone, canvas, Blocks, socket){

        var AppView = Backbone.View.extend({

            initialize: function(){
                this.setElement('body')
                Blocks.fetch()
                this.on('newBlock', function (event) {
                    this.newBlock(event)
                })
            },

            lastHue: 0,

            events: {
                'mousedown' : 'mousedown',
                'mouseup'   : 'mouseup',
                'mousemove' : 'mousemove',
                'newBlock'  : 'newBlock'
            },

            csrf: $('#_csrf').val(),

            isMouseDown: false,
            lastMouseMove: null,

            resize: function(event){
                canvas.resize(event)
            },

            mousedown: function(event){
                this.isMouseDown = true
                this.draw(event)
            },
            mouseup: function(event){
                this.isMouseDown = false
                this.lastMouseMove = null
            },
            mousemove: function(event){
                if (this.isMouseDown) {
                    this.draw(event)
                }
            },

            newBlock: function (data) {
                var block = Blocks.where({ 'x' : data.x, 'y' : data.y })
                if ( block.length < 1 ){
                    Blocks.add(data)
                } else {
                    block[0].set(data)
                }
            },

            draw: function(event){
                this.lastHue = (this.lastHue+4)%360

                var x = Math.floor( (event.pageX - (canvas.el.width/2)) / canvas.blockSize )
                  , y = Math.floor( event.pageY / canvas.blockSize )
                  , thisBlock = Blocks.where({ 'x' : x, 'y' : y })
                  , block

                if (thisBlock.length < 1){
                    block = Blocks.add({'x': x, 'y': y, 'r': 0, 'h': this.lastHue})
                } else {
                    block = thisBlock[0]
                    block.set( 'h', this.lastHue )
                    block.reset()
                }
                socket.emit('newBlock', block)
                this.lastMouseMove = {x:x,y:y}

            }
        })

        return new AppView()
    }

)