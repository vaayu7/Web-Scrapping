const request=require('request');
const cheerio=require('cheerio');
const { html } = require('cheerio/lib/static');
const url="https://www.espncricinfo.com/series/icc-women-s-world-cup-2021-22-1219028/new-zealand-women-vs-south-africa-women-16th-match-1243923/live-cricket-score";

console.log("Before Calling..............");
request(url, cb);
function cb(err, response, html){
    if(err){
        console.log(err);
    }
    else{
        extractHtml(html);
    }

}

function extractHtml(html){
    let $=cheerio.load(html);
    let eleArray=$(".d-flex.match-comment-padder.align-items-center .match-comment-long-text");
    let texte=$(eleArray[0]).text();
    let htmlData=$(eleArray[0]).html();

    console.log("text Data", texte);
    console.log("html Data", htmlData);
}

console.log("After Calling ................");