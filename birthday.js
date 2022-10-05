const request = require('request');
const cheerio = require('cheerio');
//const { html } = require('cheerio/lib/static');
const url = "https://www.espncricinfo.com/series/icc-women-s-world-cup-2021-22-1219028/new-zealand-women-vs-england-women-19th-match-1243926/full-scorecard";

console.log("Before Calling..............");
request(url, cb);
function cb(err, response, html) {
    if (err) {
        console.log(err);
    }
    else {
        extractHtml(html);
    }

}
function extractHtml(html) {
    let $ = cheerio.load(html);
    let inningArr = $(".card.content-block.match-scorecard-table>.Collapsible");

    for (let i = 0; i < inningArr.length; i++) {

        let teamNameEle = $(inningArr[i]).find(".header-title.label");
        let teamName = teamNameEle.text();
        teamName = teamName.split('INNINGS')[0];
        teamName = teamName.trim();

        let tableEle = $(inningArr[i]).find(".table.batsman");
        let allBatsman = $(tableEle).find("tr");
        for (let j = 0; j < allBatsman.length; j++) {
            let allcolBatsman = $(allBatsman[j]).find("td");
            let isbatsManCol = $(allcolBatsman[0]).hasClass("batsman-cell");
            if (isbatsManCol == true) {
                let href = $(allcolBatsman[0]).find("a").attr("href");
                let name = $(allcolBatsman[0]).text();
                let fulllink = "https://www.espncricinfo.com/" + href;
               // console.log(fulllink);
                getBirthdayPage(name, teamName, fulllink);
            }

        }
        //console.log(`Winning team : ${wTeam} Highest WicketTaker Player Name : ${hwtName} highest Wicket : ${hwt}`);
        // }
    }

}

function getBirthdayPage(name, teamName, url) {
    request(url, cb);
    function cb(err, response, html) {
        if (err) {
            console.log(err);
        }
        else {
            extractBirthday(html, teamName, name);
        }

    }
}

function  extractBirthday(html, teamName, name){
    let $=cheerio.load(html);
    let playersDetails=$(".player-card-description");
    let birthday=$(playersDetails[1]).text();
    console.log(`${name} plays for ${teamName} was born on ${birthday}`);
}