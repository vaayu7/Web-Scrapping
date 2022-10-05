const request=require('request');
const cheerio=require('cheerio');
const scoreCardOb=require('./matchDetail.js');
function getAllMatchLink(url){
    request(url, function (err, response, html){
        if(err){
            console.log(err);
        }else{
           allMatchLink(html);
        }
    } )
}

function allMatchLink(html){
    let $ = cheerio.load(html);
    let scoreCard=$("a[data-hover='Scorecard']");

    for(let i=0;i<scoreCard.length;i++){
        let link=$(scoreCard[i]).attr("href");
        //console.log(link);
        let fulllink="https://www.espncricinfo.com"+link;
        console.log(fulllink);
        scoreCardOb.ps(fulllink);
    }
}

module.exports={
gALmatches: getAllMatchLink
}