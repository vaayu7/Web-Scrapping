//const url="https://www.espncricinfo.com/series/icc-men-s-t20-world-cup-2021-22-1267897/australia-vs-new-zealand-final-1273756/full-scorecard";
const request=require('request');
const cheerio=require('cheerio');
const xlsx=require('xlsx');
const fs=require("fs");
const path=require('path');

const iplPath=path.join(__dirname, "T20WC");
const { text } = require('cheerio/lib/static');
//const { html } = require('cheerio/lib/static');

function processScorCard(url){
request(url, cb);
}
function cb(err, response, html){
    if(err){
        console.log(err);
    }
    else{
        extractMatchDetails(html);
    }
}

function extractMatchDetails(html){
    let $= cheerio.load(html);
    let desEle=$(".header-info  .description");
    let result=$(".event  .status-text");
    let stringArr=$(desEle).text().split(",")
    let venue=stringArr[1].trim();
    let date=stringArr[2].trim();
    result =result.text().trim();
    let innings=$(".card.content-block.match-scorecard-table .Collapsible");
    //let htmlstr="";
    for(let i=0;i<innings.length;i++){
        //htmlstr+=$(innings[i]).html();
        let teamName=$(innings[i]).find("h5").text();
        teamName=teamName.split("INNINGS")[0].trim();
        let index=i==0? 1 : 0;
        let oppopnentTeam=$(innings[index]).find("h5").text();
        oppopnentTeam=oppopnentTeam.split("INNINGS")[0].trim();

        let cInning=$(innings[i]);
        let allRows=cInning.find(".table.batsman tbody tr");
        for(let j=0;j<allRows.length;j++){
            let allCols=$(allRows[j]).find("td");
            let isWorthy=$(allCols[0]).hasClass("batsman-cell");
            if(isWorthy==true){
                let playerName=$(allCols[0]).text().trim();
                let runs=$(allCols[2]).text().trim();
                let balls=$(allCols[3]).text().trim();
                let fours=$(allCols[5]).text().trim();
                let sixes=$(allCols[6]).text().trim();
                let SR=$(allCols[7]).text().trim();
                console.log(`${playerName}  ${runs}  ${balls}   ${fours}  ${sixes}  ${SR}`);
               // processPlayer(teamName, playerName, runs, balls, fours, sixes, SR, oppopnentTeam ,venue, date, result);
            }
        }

       
    }
    //console.log(htmlstr);
}

function processPlayer(teamName, playerName, runs, balls, fours, sixes, SR, oppopnentTeam ,venue, date, result){
    let teamPath=path.join(__dirname, "t20WC", teamName);
    dirCreator(teamPath);
    let filePath=path.join(teamPath, playerName+".xlsx");
    let content=excelReader(filePath, playerName);
    let playerobj={
        teamName,
        playerName,
        runs, 
        fours, 
        sixes,
        SR, 
        oppopnentTeam,
        venue,
        result,       
    }
    content.push(playerobj)
    excelWriter(filePath, content, playerName);
}
function dirCreator(filePath){
    if(fs.existsSync(filePath)==false){
        fs.mkdirSync(filePath);
    }
}

function excelWriter(filePath, json, sheetName){
    let newWB=xlsx.utils.book_new();
    let newWS=xlsx.utils.json_to_sheet(json);
    xlsx.utils.book_append_sheet(newWB, newWS,sheetName);
    xlsx.writeFile(newWB, filePath);
}

function excelReader(filePath, sheetName){
    if(fs.existsSync(filePath)==false){
        return [];
    }
    let wb=xlsx.readFile(filePath);
    let excelData=wb.Sheets[sheetName];
    let ans=xlsx.utils.sheet_to_json(excelData);
    return ans;
}

module.exports={
    ps:processScorCard
}