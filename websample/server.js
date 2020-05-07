var http = require("http");
var url = require("url");

function start(route, handle,exec) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received."); //每當有人訪問時

    route(handle, pathname, response,exec);//初始路由

    //response.writeHead(200, {"Content-Type": "text/plain"});
    //var content = route(handle, pathname);
    //response.write(content);
    //response.end();
  }

  http.createServer(onRequest).listen(8888); //成功建立伺服器時
  console.log("Server has started.");
}

exports.start = start; //我們把我們的伺服器腳本放到一個叫做 start 的函數裡，然後我們會匯出這個函數。