var time=60;

async function getData() {
    time=60;
    document.getElementById("timer").innerHTML=time;
    const response=await fetch("http://localhost:3000").then((response) => response.json());
    var mx=0, id=1;
    document.getElementById("restInfo").innerHTML="";
    for (const i in response["data"]) {
        let tmp="<div class=\"info\">\n"+
            "<div class=\"infobox\">"+id+"</div>"+
            "<div class=\"infobox\">"+response["data"][i]["base_unit"]+"</div>\n"+
            "<div class=\"infobox\">"+response["data"][i]["buy"]+"/"+response["data"][i]["sell"]+"</div>\n"+
            "<div class=\"infobox\">"+response["data"][i]["volume"]+"</div>\n"+
            "<div class=\"infobox\">"+response["data"][i]["base_unit"]+"</div>\n"+
        "</div>\n";
        document.getElementById("restInfo").insertAdjacentHTML("beforeend", tmp);
        id++;
        mx=Math.max(mx,parseFloat(response["data"][i]["sell"]));
        // console.log(parseFloat(response["data"][i]["buy"]));
        // console.log("request made");
    }
    document.getElementById("price").innerHTML=String(mx);
}

function changeTimer() {
    document.getElementById("timer").innerHTML=time;
    time--;
}

getData();
setInterval(getData, 60000);
setInterval(changeTimer,1000);