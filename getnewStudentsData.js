const http = require('http');
const express = require('express');
const app = express();
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

app.get('/', (req, res) => {
  let count = 1;
  res.write('<head><meta charset="utf-8"/></head>');
  res.write('<h1 style="text-align: center;">武院贴吧新生新闻</h1>');
  setInterval(() => {
    request('http://tieba.baidu.com/f?kw=%E6%AD%A6%E5%A4%B7%E5%AD%A6%E9%99%A2&ie=utf-8&pn=' + 50 * (count++), (error, response, body) => {
      if (error) {
        console.log('error!');
        return;
      }
      $ = cheerio.load(body);
      const titleArr = [];
      const url = [];
      for (let i = 0; i < $('.j_th_tit').length; i++) {
        titleArr.push($('.j_th_tit').eq(i + 1).attr('title'));
        url.push($('.j_th_tit').eq(i + 1).attr('href'));
      }
      titleArr.forEach((e, i) => {
        // indexOf里面输入关键字
        let isExis = ('' + e).indexOf('新生');
        if (isExis != -1) {
          console.log(e.indexOf('新生'));
          fs.exists('./count', exists => {
            console.log('文件是否存在?:' + exists);
            if (!exists) { //如果文件不存在
              fs.appendFile('count.txt', '标题:' + titleArr[i] + '链接:http://tieba.baidu.com' + url[i], err => { //创建文件 并且抓取数据存入
                if (err) throw err;
                console.log('文件已经创建');
              })
            }
          })
          res.write('<p"><a href="http://tieba.baidu.com' + url[i] + '">' + titleArr[i] + '</a></p>');
        }
      })
    })
  }, 1000)
});

const server = app.listen(3000, () => {
  console.log('listening at 3000');
});
