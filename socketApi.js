'use strict';
var socket_io = require('socket.io');
var io = socket_io();
var socketApi = {};

socketApi.io = io;

let points=[];


class Point{
   
    constructor(id, topPoint, leftPoint){
        this.topPoint = topPoint;
        this.leftPoint = leftPoint;
        this.id = id;
    }
    sendMove(keyCode){
        let newLeft, newTop;
        let height, width;
        height = 30;
        width = 50;
        switch (keyCode) {
            case 37: //left
                newLeft = this.leftPoint + width;
                newLeft = --newLeft % width;
                this.leftPoint = newLeft;
                break;
            case 38: //up
                newTop = this.topPoint + height
                newTop = --newTop % height;
                this.topPoint = newTop;
                break;
            case 39:  //right
                newLeft = ++this.leftPoint % width;
                this.leftPoint = newLeft;
                break;
            case 40: //down
                newTop = ++this.topPoint % height;
                this.topPoint = newTop;
                break;
        }

    }
}

io.on('connection', function(socket){
    console.log('A user connected');
    socket.on('sendCode', function(data){

        let dt = points.find(x => x.id == data.id);

        //console.log(dt);
        if(!dt)
        {
            dt = new Point(data.id, 0, 0);
            points.push(dt);
            //console.log(dt);
        }
        dt.sendMove(data.keyCode);

        io.sockets.emit("move", dt);

    });
});

socketApi.sendNotification = function() {
    io.sockets.emit('hello', {msg: 'Hello World!'});
};

module.exports = socketApi;
