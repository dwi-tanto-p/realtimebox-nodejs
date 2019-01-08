$(function () {
    var width = 50;
    var height = 30;
    var uom = "em";
    var top = 0;
    var left = 0;
    var lastKeyDown = 37;

    var socket = io();


    var snakeArea = document.getElementById("snakeArea");
    snakeArea.style.width = width + uom;
    snakeArea.style.height = height + uom;

    var timer = setInterval(sendKeyDown, 300);

    function sendKeyDown() {
        
        socket.emit("sendCode", {id: getCookie("userId"), keyCode:lastKeyDown});
    }

    document.addEventListener("keydown", keyPressFunction, false);

    function keyPressFunction(e) {
        if(e.keyCode >= 37 && e.keyCode <= 40)
            lastKeyDown = e.keyCode;
        //socket.emit("sendCode", {id: getCookie("userId"), keyCode:e.keyCode});
    }

    socket.on("move", function(p){
        //debugger;
        var block =  document.getElementById(p.id);
        if(!block)
        {
            var color = '#'+Math.floor(Math.random()*16777215).toString(16);
            var area =document.getElementById("snakeArea").innerHTML += 
            `<div class='mySnake' id='${p.id}' style='background-color:${color}'></div>`;
            block = document.getElementById(p.id);

        }
        
        block.style.top = p.topPoint +"em";
        block.style.left = p.leftPoint +"em";
        
    });

    function getCookie(name) {
        let cookie = {};
        document.cookie.split(';').forEach(function(el) {
          let [k,v] = el.split('=');
          cookie[k.trim()] = v;
        })
        return cookie[name];
      }

      var slider = document.getElementById("speedRange");
      slider.addEventListener("change", changeSpeed);

      function changeSpeed(e){
          var speed = parseInt( e.target.value) ;
          var interval = 1000 - (speed * 10);
          clearInterval(timer);
          if(speed>0)
          {
              timer = setInterval(sendKeyDown, interval);
          }

        
      }

     

   

   
   

});