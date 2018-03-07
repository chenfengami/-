//依赖模块
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const mkdirp = require('mkdirp');
const http = require('http');

//目标网址
const url = 'http://me2-sex.lofter.com/tag/美女摄影?page=';

//本次存储目录
const dir = './images';

//创建目录
mkdirp(dir, (err) => {
    if(err){
        console.log(err);
        return;
    }
});
let src;
//发送请求
request(url, (error, response, body) => {
    if(error){
        console.log(error);
        return;
    }
    if(!error && response.statusCode == 200){
        const $ = cheerio.load(body);
        $('.img img').each(() => {
            src = $(this).attr('src');
            console.log('正在下载，图片路径为:' + src);
            download(src, dir, Math.floor(Math.random()*100000) + src.substr(-4,4));
            console.log('图片下载完成');
        });
    }
});

const download = (...types) =>{
    request.head(url, (err, res, body) => {
        request.pipe(fs.createWriteStream(dir + "/" + filename));
    })
}

http.createServer((req, res) => {
    res.writeHead(200,{"Content-type": "text/plain"});
    // res.write(src);
    console.log('success server in 7777');
    console.log('url' + src);
}).listen(7777);