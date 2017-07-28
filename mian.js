const electron=require('electron');
const app =electron.app;
const BrowserWindow=electron.BrowserWindow;
var mainWidow=null;
app.on('ready',function(){
    mainWidow=new BrowserWindow({
        width:612,
        height:383
    });
    mainWidow.loadURL(`file://${__dirname}/src/index.html`)
})
