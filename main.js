const url="https://www.espncricinfo.com/series/icc-men-s-t20-world-cup-2021-22-1267897";
const request=require('request');
const xlsx=require('xlsx');
const fs=require("fs");
const path=require('path');

const iplPath=path.join(__dirname, "T20WC");
dirCreator(iplPath);
const cheerio=require('cheerio');
const AllMatchob=require('./allMatch.js');
//const { html } = require('cheerio/lib/static');


request(url, cb);
function cb(err, response, html){
    if(err){
        console.log(err);
    }
    else{
        extractLink(html);
    }
}

function extractLink(html){
    let $= cheerio.load(html);
    let anchorEle=$(".ds-py-3.ds-px-4 span.ds-inline-flex.ds-items-center.ds-leading-none");
    let link=anchorEle[11].attr("href");

    let fulllink="https://www.espncricinfo.com"+link;
    console.log(fulllink);
    
    AllMatchob.gALmatches(fulllink);
}

function dirCreator(filePath){
     if(fs.existsSync(filePath)==false){
         fs.mkdirSync(filePath);
     }
 }



