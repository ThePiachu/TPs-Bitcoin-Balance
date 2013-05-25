function poll() {
	chrome.runtime.sendMessage({request: "request"}, function(response) {
  generateTable(response.data);
});
}
function generateTable(lastResponse) {
	//console.log('Generating table');
	var resp=JSON.parse(lastResponse);
	
	var headerTitles=new Array("Address", "Balance", "Number of Transaction");
	var headers=new Array("address", "final_balance", "n_tx");
	var table=document.getElementById("BalanceTable");
	//table.innerHTML="";
	
	var tableBody=document.createElement("tbody");
	
	var row=document.createElement("tr");
	for (var i=0;i<3;i++)
	{
		var cell=document.createElement("td");
		var cellText=document.createTextNode(headerTitles[i]);
		cell.appendChild(cellText);
		row.appendChild(cell);
	}
	tableBody.appendChild(row);
	
	for(var j=0;j<resp["addresses"].length;j++){
		row=document.createElement("tr");
	
		for (var i=0;i<3;i++) {
			var cell=document.createElement("td");
			var cellText="";
			if (headers[i]=="address"){
				var a = document.createElement('a');
				var linkText = document.createTextNode(resp["addresses"][j][headers[i]]);
				a.appendChild(linkText);
				a.title = resp["addresses"][j][headers[i]];
				a.href = "https://blockchain.info/address/"+resp["addresses"][j][headers[i]];
				a.target = "_blank";
				cell.appendChild(a);
			} else {
				if (headers[i]=="final_balance"){
					cellText=document.createTextNode(resp["addresses"][j][headers[i]]/100000000.0);
				} else {
					cellText=document.createTextNode(resp["addresses"][j][headers[i]]);
				}
				cell.appendChild(cellText);
			}
			row.appendChild(cell);
		}
		tableBody.appendChild(row);
	}
	
	table.appendChild(tableBody);
	table.setAttribute("border", "2");
	
	
	var txHeaderTitles=new Array("Hash", "Time", "Balance change");
	var txHeaders=new Array("hash", "time", "result");
	
	var txTable=document.getElementById("TransactionTable");
	txTable.innerHTML="";
	
	tableBody=document.createElement("tbody");
	
	row=document.createElement("tr");
	for (var i=0;i<3;i++)
	{
		var cell=document.createElement("td");
		var cellText=document.createTextNode(txHeaderTitles[i]);
		cell.appendChild(cellText);
		row.appendChild(cell);
	}
	tableBody.appendChild(row);
	
	for(var j=0;j<resp["txs"].length;j++){
		row=document.createElement("tr");
	
		if ((resp["txs"][j]["result"]) > 0)
		{
			row.setAttribute("bgcolor", "#00CC00");
		} else
		{
			row.setAttribute("bgcolor", "#CC0000");
		}
		
		for (var i=0;i<3;i++) {
			var cell=document.createElement("td");
			var cellText="";
			if (txHeaders[i]=="hash"){
				var a = document.createElement('a');
				var linkText = document.createTextNode(resp["txs"][j][txHeaders[i]].slice(0, 8)+"...");
				a.appendChild(linkText);
				a.title = resp["txs"][j][txHeaders[i]];
				a.href = "https://blockchain.info/tx/"+resp["txs"][j][txHeaders[i]];
				a.target = "_blank";
				cell.appendChild(a);
			} else {
				if (txHeaders[i]=="result"){
					if (resp["txs"][j][txHeaders[i]]>0){
						cellText=document.createTextNode("+"+resp["txs"][j][txHeaders[i]]/100000000.0);
					} else {
						cellText=document.createTextNode(resp["txs"][j][txHeaders[i]]/100000000.0);
					}
				} else if (txHeaders[i]=="time") {
					var d=new Date(resp["txs"][j][txHeaders[i]]*1000);
					cellText=document.createTextNode(PrintDate(d));
				} else {
					cellText=document.createTextNode(resp["txs"][j][txHeaders[i]]);
				}
				cell.appendChild(cellText);
			}
			row.appendChild(cell);
		}
	
		tableBody.appendChild(row);
	}
	
	txTable.appendChild(tableBody);
	txTable.setAttribute("border", "2");
}

function PrintDate(d)
{
	var answer = d.getFullYear()+"-"+Pad((d.getMonth()+1))+"-"+Pad(d.getDate())+" "+Pad(d.getHours())+":"+Pad(d.getMinutes());
	return answer;
}

function Pad(x)
{
	if (x<10){
		return "0"+x;
	}
	return ""+x;
}

poll();