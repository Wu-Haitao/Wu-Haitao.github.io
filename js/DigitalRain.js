window.onload = function(){
    if(!/Android|webOS|iPhone|iPod|iPad|BlackBerry/i.test(navigator.userAgent)) {
    var canvas = document.createElement("canvas");
    document.getElementsByTagName("body")[0].appendChild(canvas);
    var s = window.screen;
    var W = s.width;
    var H = s.height;
    canvas.width = W;
    canvas.height = H;
    canvas.setAttribute('style', 'position: fixed; left: 0; top: 0; z-index: -2; filter:blur(1px);');
    canvas.setAttribute('id', 'canvas_digitalRain');
    var context =canvas.getContext("2d");
    var fontSize = 12;
    var dropLength = 16;
    var colunms = Math.floor(W /fontSize);  
    var drops = [];
    for(var i=0;i<colunms;i++){
        drops.push(2 * Math.floor(canvas.height / fontSize));
    }
    var str ="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    function draw(){
        var e = document.getElementsByTagName("html")[0].getAttribute("data-theme");
        context.font = fontSize+"px  Georgia";
        context.clearRect(0, 0, canvas.width, canvas.height);
        for(var i=0;i<colunms;i++){
            var x = i * fontSize;
            var y = drops[i] * fontSize;
            for (var j=0;j<dropLength;j++){
                if (y<0) break;
                var index = Math.floor(Math.random() * str.length);
                if (e == "light") {
                    context.fillStyle = randColor(1, 1-j*(1/dropLength));
                }
                else {
                    context.fillStyle = randColor(0, 1-j*(1/dropLength));
                }
                context.fillText(str[index],x,y)
                y -= fontSize;
            }
            if(y >= canvas.height){
                if (Math.random() > 0.99) {
                    drops[i] = 0;
                }
                else {
                    drops[i] = 2 * Math.floor(canvas.height / fontSize);
                }
            }
            drops[i]++;
        }
    };
    function randColor(option, opacity){//随机灰色
        if (option == 1) {
          var r = 204 + Math.floor(Math.random() * 51);
        }
        else {
          var r = 102 + Math.floor(Math.random() * 51);
        }
        var g = r;
        var b = r;
        return "rgba("+r+","+g+","+b+","+opacity*0.8+")";
    }
    draw();
    setInterval(draw,80);
    }
};