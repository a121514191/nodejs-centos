
var http = require("http");
var url = require("url");

function start(route, handle, exec,spawn) {
  function onRequest(request, response) {
    var postData = "";
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received."); //每當有人訪問時
    // route(handle, pathname, response, exec,request,spawn);


    request.setEncoding("utf8"); //設定了接收資料的編碼格式為UTF-8
    //然後註冊了 "data" 事件的監聽器，用於收集每次接收到的新資料區塊，並將其賦值給postData 變數
    request.addListener("data", function (postDataChunk) {
      console.log('start');
      postData += postDataChunk;
      console.log(postData);
      // console.log("Received POST data chunk '" +
      //   postDataChunk + "'.");
    });
    request.addListener("end", function () {
      console.log('end');
      route(handle, pathname, response,exec,postData,spawn);
    });

    // route(handle, pathname, response, exec);//初始路由

    //response.writeHead(200, {"Content-Type": "text/plain"});
    //var content = route(handle, pathname);
    //response.write(content);
    //response.end();
  }

  http.createServer(onRequest).listen(8888); //成功建立伺服器時
  console.log("Server has started.");
}

exports.start = start; //我們把我們的伺服器腳本放到一個叫做 start 的函數裡，然後我們會匯出這個函數。