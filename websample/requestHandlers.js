
function start(response, exec) {
  console.log("Request handler 'start' was called.");

  var body = 
  '<!doctype html>'+
  '<html lang="en">'+
  '  <head>'+
  '    <!-- Required meta tags -->'+
  '    <meta charset="utf-8">'+
  '    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">'+
  '    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">'+
  '    <title>Hello, world!</title>'+
  '  </head>'+
  '  <body>'+
  '    <h1>Hello, world!</h1>'+
  '    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>'+
  '    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js" integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut" crossorigin="anonymous"></script>'+
  '    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js" integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k" crossorigin="anonymous"></script>'+
  '  </body>'+
  '</html>';

  response.writeHead(200, { "Content-Type": "text/html" });
  response.write(body);
  response.end();
}

function upload(response, exec) {
  console.log("Request handler 'upload' was called.");
  response.writeHead(200, { "Content-Type": "text/plain" });
  
  // spawn("C:/Program Files/Git/git-bash.exe", ['./test.sh']);
  exec('ls -al', function (err, stdout, stderr) {
    console.log('ls');
    console.log(stdout);
    // response.write(stdout);
  });
  response.end();
}

exports.start = start;
exports.upload = upload;