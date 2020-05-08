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

2.使用bootstrap官網 基礎檔 排版 [https://bootstrap.hexschool.com/docs/4.2/getting-started/introduction/]

3.排出來的成果

![](https://github.com/a121514191/nodejs-centos/blob/master/websample/img/web.PNG)

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

### 2. 記錄並分享-終端機所執行的紀錄 asciinema  

1. 安裝

```
yum install asciinema
```
2. 執行

```
asciinema rec
```

3. 建檔的執行

```
asciinema rec test01 //asciinema rec 當前目錄檔名
```

4. 本地播放檔案

```
asciinema play test01 //asciinema play 當前目錄檔名
```

5. 本地上傳檔案到org

```
asciinema upload test01 //asciinema upload 當前目錄檔名
```

6. 本地打包txt 

```
asciinema cat test01 > test001.txt //asciinema cat 當前目錄檔名 > 所需檔名
```

7. 外加指令

```
--stdin -啟用標準輸入（鍵盤）錄音（如下所示）
--append -追加到現有錄音
--raw -保存原始STDOUT輸出，不包含時序信息或其他元數據
--overwrite -覆蓋錄音（如果已經存在）
-c, --command=<command> -指定要記錄的命令，默認為$ SHELL
-e, --env=<var-names> -要捕獲的環境變量列表，默認為 SHELL,TERM
-t, --title=<title> -指定asciicast的標題
-i, --idle-time-limit=<sec>-將記錄的終端不活動限制為最大<sec>秒數
-y, --yes -對所有提示回答“是”（例如，上傳確認）
-q, --quiet -保持安靜，禁止所有通知/警告（暗示-y）
```