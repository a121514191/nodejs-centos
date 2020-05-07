const { spawn,exec,execFile } = require('child_process');
const syncFile= spawn("C:/Program Files/Git/git-bash.exe", ['./test.sh']);

syncFile.stdout.on('data', (data) => {
  console.log(data.toString());
});

syncFile.stderr.on('data', (data) => {
  console.log(data.toString());
});

syncFile.on('exit', (code) => {
  console.log(`子进程退出码：${code}`);
});
