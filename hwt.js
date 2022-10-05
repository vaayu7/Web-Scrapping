const request=require('request');
const cheerio=require('cheerio');
//const { html } = require('cheerio/lib/static');
const url="https://www.espncricinfo.com/series/icc-women-s-world-cup-2021-22-1219028/new-zealand-women-vs-england-women-19th-match-1243926/full-scorecard";

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
    let teamArray=$(".match-info.match-info-MATCH.match-info-MATCH-half-width .team");
    let wTeam;
    for(let i=0;i<teamArray.length;i++){
        let hasClass=$(teamArray[i]).hasClass("team-gray");

        if(hasClass==false){
            wTeam=$(teamArray[i]).find(".name");
            wTeam=wTeam.text().trim();
          //  console.log(wTeam);
        }
    }
    let inningArr=$(".card.content-block.match-scorecard-table>.Collapsible");
   // let htmlstr="";
    //console.log(inningArr.length);
    for(let i=0;i<inningArr.length;i++){
        //let chtml=$(inningArr[i]).html();
        //htmlstr+=chtml;
        let teamNameEle=$(inningArr[i]).find(".header-title.label");
        let teamName=teamNameEle.text();
        teamName=teamName.split('INNINGS')[0];
        teamName=teamName.trim();
        let hwt=0;
        let hwtName="";
        if(wTeam==teamName){
            //console.log(teamName);
            let tableEle=$(inningArr[i]).find(".table.bowler");
            let allBowlers=$(tableEle).find("tr");
            for(let j=0;j<allBowlers.length;j++){
                let allcolBowlers=$(allBowlers[j]).find("td");
                let bolwername=$(allcolBowlers[0]).text();
                let bowlerWicket=$(allcolBowlers[4]).text();

                if(hwt<bowlerWicket){
                    hwt=bowlerWicket;
                    hwtName=bolwername;
                }
            }
            console.log(`Winning team : ${wTeam} Highest WicketTaker Player Name : ${hwtName} highest Wicket : ${hwt}`);
        }
    }

    //console.log(htmlstr);
}