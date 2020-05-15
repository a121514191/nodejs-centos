var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");
const { spawn,exec,execFile } = require('child_process');

var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;
handle["/logo"] = requestHandlers.logo;
handle["/template_001"] = requestHandlers.template_001;

server.start(router.route,handle,exec,spawn); //執行server.js 的 start