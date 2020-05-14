var formidable = require('formidable');

var querystring = require("querystring");

fs = require("fs");

function start(response, exec, postData, spawn) {
  console.log("Request handler 'start' was called.");
  //html form的name很重要
  var body = '<!doctype html> <html lang="en"> <head> <meta charset="utf-8"> <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"> <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous"> <title>9skin web</title> </head> <body> <div class="container"> <div class="row"> <div class="col-2"> </div> <div class="col-8" style="text-align: center;"> <img src="data:image/png;base64,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PhewWpfJzMy8NZDuAgggmrWJiAHA4lkIWNSqvX//3hiY65SBdb4wMHeC1mv/B/Z0Pty6des+sFq7BGxvXF2yZMkLhlEwKAFAAA1oIhoFwwMABNDotQyjgGIAEECjiWgUUAwAAmg0EY0CigFAAI0molFAMQAIoNFENAooBgABNJqIRgHFACCARhPRKKAYAATQaCIaBRQDgAAaTUSjgGIAEECjiWgUUAwAAmg0EY0CigFAAI0molFAMQAIoNFENAooBgABNJqIRgHFACCARhPRKKAYAATQaCIaBRQDgAAaTUSjgGIAEECjiWgUUAwAAmg0EY0CigFAAI0molFAMQAIoNFENAooBgABNJqIRgHFACCARhPRKKAYAATQaCIaBRQDgAAaTUSjgGIAEECjiWgUUAwAAmg0EY0CigFAAI0molFAMQAIoNFENAooBgABNJqIRgHFACCARhPRKKAYAATQaCIaBRQDgAAaTUSjgGIAEECjiWgUUAwAAmg0EY0CigFAAI0molFAMQAIoNFENAooBgABNJqIRgHFACCARhPRKKAYAATQaCIaBRQDgAAaTUSjgGIAEECjiWgUUAwAAmg0EY0CigFAAI0molFAMQAIoNFENAooBgABNJqIRgHFACCARhPRKKAYAATQaCIaBRQDgAAaTUSjgGIAEECjiWgUUAwAAmg0EY0CigFAAI0molFAMQAIoNFENAooBgABNJqIRgHFACCARhPRKKAYAATQaCIaBRQDgAAaTUSjgGIAEECjiWgUUAwAAmg0EY0CigFAAI0molFAMQAIoNFENAooBgABBgBCjI1dZ3whFQAAAABJRU5ErkJggg=="> </div> <div class="col-2"> </div> </div> <div class="row"> <div class="col-4"> </div> <div class="col-4"> <form action="/upload" method="post" > <div class="form-group"> <label>輸入現有網址</label> <input type="text" class="form-control" id="Url_id" name="Url" aria-describedby="emailHelp" placeholder="Url"> </div> <div class="form-group"> <label>輸入資料夾名稱</label> <input type="text" class="form-control" id="Document_id" name="Document" placeholder="Document_name"> </div> <div class="form-group"> <label>選擇要匯入的資料</label> <input style="height: 45px;" type="file" class="form-control" id="upload_id" name="upload" placeholder="upload_file" > </div> <input type="submit" class="btn btn-primary"></input> </form> </div> <div class="col-4"> </div> </div> </div> <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script> <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js" integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut" crossorigin="anonymous"></script> <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js" integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k" crossorigin="anonymous"></script> </body> </html>';

  response.writeHead(200, { "Content-Type": "text/html" });
  response.write(body);
  response.end();
}

//完整form函式
function upload(response, exec, postData, spawn, request) {
  //console.log 是回應server  response.write 回應client
  console.log("Request handler 'upload' was called.");
  // console.log(postData);
  // response.writeHead(200, { "Content-Type": "text/html" });
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.write("You're Url is : " +
    querystring.parse(postData).Url) + "  |  ";
  response.write("You're Document is : " +
    querystring.parse(postData).Document) + "  |  ";
  response.write("You're upload is : " +
    querystring.parse(postData).upload) + "  |  ";



  exec('mkdir -p /var/www/html/' + querystring.parse(postData).Document, function (err, stdout, stderr) {
    console.log('mkdir : ');
    console.log(stderr);
    exec('touch /etc/httpd/conf.d/' + querystring.parse(postData).Document + '.conf', function (err, stdout, stderr) {
      console.log('touch : ');
      exec('echo -e "<VirtualHost *:80>' +
        '\n    ServerName ' + querystring.parse(postData).Url +
        '\n    DocumentRoot  /var/www/html/' + querystring.parse(postData).Document +
        '\n    ErrorLog logs/' + querystring.parse(postData).Document +
        '\n    CustomLog logs/' + querystring.parse(postData).Document + '_log common' +
        '\n    <Directory "/var/www/html/' + querystring.parse(postData).Document + '">' +
        '\n        Options FollowSymLinks' +
        '\n        AllowOverride None' +
        '\n        Order allow,deny' +
        '\n        allow from all' +
        '\n    </Directory>' +
        '\n</VirtualHost>" > /etc/httpd/conf.d/' + querystring.parse(postData).Document + '.conf;exit;enter;', function (error, stdout, stderr) {
          if (error) {
            console.log(error);
          }
          else {
            console.log("成功");
          }
        });
     
    });
  });
  var form = new formidable.IncomingForm();
  console.log("about to parse 預備");
  console.log(form);
  form.parse(request, function (error, fields, files) {
    console.log("查看file");
    console.log(files);
    console.log("parsing done");
    fs.renameSync(files.upload.path, "/tmp/" + querystring.parse(postData).upload);
    // response.write("received image:<br/>");
    // response.write("<img src='/show' />");
  });
  response.end();
}

// function show(response, exec, postData) {
//   console.log("Request handler 'show' was called.");
//   fs.readFile("/tmp/test.png", "binary", function(error, file) {
//     if(error) {
//       response.writeHead(500, {"Content-Type": "text/plain"});
//       response.write(error + "\n");
//       response.end();
//     } else {
//       response.writeHead(200, {"Content-Type": "image/png"});
//       response.write(file, "binary");
//       response.end();
//     }
//   });
// }

//理想函式
function upload_want(response, exec, postData) {
  console.log("Request handler 'upload' was called.");
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.write("You're Url is : " +
    querystring.parse(postData).Url);
  response.write("You're Document is : " +
    querystring.parse(postData).Document);

  // exec('touch /etc/httpd/conf.d/' + querystring.parse(postData).Document + '.conf', function (err, stdout, stderr) {
  //   console.log('touch : ');
  //   exec('echo -e "<VirtualHost *:80>' +
  //     '\n    ServerName ' + querystring.parse(postData).Url +
  //     '\n    DocumentRoot  /var/www/html/' + querystring.parse(postData).Document +
  //     '\n    ErrorLog logs/' + querystring.parse(postData).Document +
  //     '\n    CustomLog logs/' + querystring.parse(postData).Document + '_log common' +
  //     '\n    <Directory "/var/www/html/' + querystring.parse(postData).Document + '">' +
  //     '\n        Options FollowSymLinks' +
  //     '\n        AllowOverride None' +
  //     '\n        Order allow,deny' +
  //     '\n        allow from all' +
  //     '\n    </Directory>' +
  //     '\n</VirtualHost>" > /etc/httpd/conf.d/' + querystring.parse(postData).Document + '.conf;exit;enter;', function (error, stdout, stderr) {
  //       if (error) {
  //         console.log(error);
  //       }
  //       else {
  //         console.log("成功");
  //       }
  //     });
  // });
  // var body = '<!doctype html> <html lang="en"> <head> <meta charset="utf-8"> <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"> <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous"> </head> <body> <div class="container"> <div class="row"> <div class="col-2"> </div> <div class="col-8" style="text-align: center;"> <script id="asciicast-psk6wrIMsENOJB5Ew2UqLUA7V" data-autoplay="true" src="https://asciinema.org/a/psk6wrIMsENOJB5Ew2UqLUA7V.js" async></script> </div> <div class="col-2"> </div> </div> <!-- Optional JavaScript --> <!-- jQuery first, then Popper.js, then Bootstrap JS --> <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script> <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js" integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut" crossorigin="anonymous"></script> <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js" integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k" crossorigin="anonymous"></script> </body> </html>';
  // response.writeHead(200, { "Content-Type": "text/html" });
  // response.write(body);
  response.end();
}

//測試asciinema函式
function upload_test(response, exec, postData, spawn) {
  // console.log("asciinema test start");
  // const asci_start = spawn('top', ['-d 1']);
  // const asci_ls = spawn('ls', ['-la']);
  // const asci_exit = spawn('./', ['asciinema_exit.sh']);

  // asci_start.stdout.on('data', (data) => {
  //   console.log(`stdout: ${data}`);
  // });

  // asci_start.stderr.on('data', (data) => {
  //   console.error(`stderr: ${data}`);
  // });
  // asci_start.on('close', (code) => {
  //   console.log(`子进程退出，退出码 ${code}`);
  // });
  // var cmd = 'asciinema rec a01 && ls -la && exit && enter';
  // exec(cmd, function (error, stdout, stderr) {
  //   if (error) {
  //     console.log(error);
  //   }
  //   else {
  //     console.log("成功");
  //   }
  // });
  // var body = '<!doctype html> <html lang="en"> <head> <meta charset="utf-8"> <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"> <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous"> </head> <body> <div class="container"> <div class="row"> <div class="col-2"> </div> <div class="col-8" style="text-align: center;"> <script id="asciicast-psk6wrIMsENOJB5Ew2UqLUA7V" data-autoplay="true" src="https://asciinema.org/a/psk6wrIMsENOJB5Ew2UqLUA7V.js" async></script> </div> <div class="col-2"> </div> </div> <!-- Optional JavaScript --> <!-- jQuery first, then Popper.js, then Bootstrap JS --> <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script> <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js" integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut" crossorigin="anonymous"></script> <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js" integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k" crossorigin="anonymous"></script> </body> </html>';
  // response.writeHead(200, { "Content-Type": "text/html" });
  // response.write(body);
  // response.end();
}

exports.start = start;
exports.upload = upload;
// exports.show = show;