
function start(response, exec,postData) {
  console.log("Request handler 'start' was called.");

  var body = '<html>'+
  '<head>'+
  '<meta http-equiv="Content-Type" content="text/html; '+
  'charset=UTF-8" />'+
  '</head>'+
  '<body>'+
  '<form action="/upload" method="post">'+
  '<input type="text" class="form-control" id="Url" aria-describedby="emailHelp" placeholder="Url">'+
  '<input type="submit" value="Submit text" />'+
  '</form>'+
  '</body>'+
  '</html>';

  response.writeHead(200, { "Content-Type": "text/html" });
  response.write(body);
  response.end();
}

function upload(response, exec,postData) {
  console.log("Request handler 'upload' was called.");
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.write("You've sent: " + postData);
  // spawn("C:/Program Files/Git/git-bash.exe", ['./test.sh']);
  // exec('ls -al', function (err, stdout, stderr) {
  //   console.log('ls');
  //   console.log(stdout);
  //   // response.write(stdout);
  // });
  response.end();
}

exports.start = start;
exports.upload = upload;