var formidable = require('formidable');

var querystring = require("querystring");



function start(response, exec, postData, spawn) {
  console.log("Request handler 'start' was called.");
  //html form的name很重要
  var body ='<!doctype html> <html lang="en"> <head> <meta charset="utf-8"> <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"> <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous"> <title>9skin web</title> </head> <body> <div class="container"> <div class="row"> <div class="col-2"> </div> <div class="col-8" style="text-align: center;"> <img src="/logo"> </div> <div class="col-2"> </div> </div> <div class="row"> <div class="col-4"> </div> <div class="col-4"> <form action="/upload" method="post" enctype="multipart/form-data"> <div class="form-group"> <label>輸入現有網址</label> <input type="text" class="form-control" id="Url_id" name="Url" aria-describedby="emailHelp" placeholder="Url"> </div> <div class="form-group"> <label>輸入資料夾名稱</label> <input type="text" class="form-control" id="Document_id" name="Document" placeholder="Document_name"> </div> <div class="form-group" > <label>選擇要匯入的資料</label> <input style="height: 45px;" type="file" class="form-control" id="upload_id" name="upload" placeholder="upload_file" > </div> <input type="submit" class="btn btn-primary"></input> </form> </div> <div class="col-4"> </div> </div> </div> <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script> <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js" integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut" crossorigin="anonymous"></script> <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js" integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k" crossorigin="anonymous"></script> </body> </html>';
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
    querystring.parse(postData).Url);
  response.write("You're Document is : " +
    querystring.parse(postData).Document);
  response.write("You're upload is : " +
    querystring.parse(postData).upload);

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


  // var form = new formidable.IncomingForm();
  //       console.log("about to parse 預備");
  //       console.log(form);
  //       form.parse(request, function (error, fields, files) {
  //         console.log("查看file");
  //         console.log(files);
  //         console.log("parsing done");
  //         fs.renameSync(files.upload.path, "/tmp/ladyme2.sql");
  //         // response.write("received image:<br/>");
  //         // response.write("<img src='/show' />");
  //       });

  response.end();
}

function show(response, exec, postData, spawn, request,fs) {
  console.log("Request handler 'show' was called.");
  fs.readFile("/tmp/test.png", "binary", function(error, file) {
    if(error) {
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {"Content-Type": "image/png"});
      response.write(file, "binary");
      response.end();
    }
  });
}

function logo(response, exec, postData, spawn, request,fs) {
  console.log("Request handler 'logo' was called.");
  fs.readFile("/michael/nodejs-centos/websample/img/9skin.png", "binary", function(error, file) {
    if(error) {
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {"Content-Type": "image/png"});
      response.write(file, "binary");
      response.end();
    }
  });
}

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
exports.show = show;
exports.logo = logo;