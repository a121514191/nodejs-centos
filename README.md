# nodejs-centos

今天分兩個部份報告

### 1. node_js 寫 web(包含form表單) + 終端機 再centos 上建vhost

參考文章

1. nodejs 入門: https://www.nodebeginner.org/index-zh-tw.html

2. img 轉 base64 : https://c.runoob.com/front-end/59

3. html 轉 js用字串: https://www.ez2o.com/App/Web/HtmlEncodeDecode

### 2. 明傲哥交代的 一個用於 記錄並分享-終端機所執行的紀錄 asciinema 

參考文章

1.https://asciinema.org/docs/getting-started

### Step_01 首先是 node_js 寫 web(包含form表單) + 終端機 再centos 上建vhost

1.img 我直接轉base64 原因(nodejs引入png失敗，先用base64將就一下 ) [https://c.runoob.com/front-end/59]

2.使用bootstrap官網 基礎檔 排版 

3. 排出來的成果

![]();

4. 透過 html 轉 js用字串 的網頁 將web 轉碼 [https://www.ez2o.com/App/Web/HtmlEncodeDecode]

5. 這次網頁的js 使用了   request.addListener data 事件的監聽器 (詳細請見程式碼)

```
 //宣告變數
 var postData = "" 

 //監聽 post -name
 request.addListener("data", function (postDataChunk) {
      //寫入變數
      postData += postDataChunk;
      console.log("postDataChunk");
 });
   
 request.addListener("end", function () {
      //postData 帶入 function
      route(handle, pathname, response, exec,postData);
 });
```

6.上傳至server 實作&檢查



