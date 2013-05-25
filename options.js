// Save this script as `options.js`

// Saves options to localStorage.
function cleanUpString(str)
{
	return str.replace(/\W/g, '');
}

function printAddresses(addresses)
{
	return addresses.replace(/\,/g,'\n')
}

function parseInput(toParse)
{
	var split = toParse.split("\n");
	var answer = new Array();
	for (var i=0;i<split.length;i++)
	{
		var tmp=cleanUpString(split[i]);
		if (CheckAddressForValidityWithNetByte(tmp, 0))
		{
			answer.push(tmp);
		}
	}
	return answer;
}

function saveOptions() {
	var select = document.getElementById("addresses");
	var addressesInput = select.value;
	
	var addresses = parseInput(addressesInput);
	
	localStorage["bitcoinAddresses"] = addresses;
	
	location.reload();
	
	/*select.value=printAddresses(addressesInput);
	
	// Update status to let user know options were saved.
	var status = document.getElementById("status");
	status.innerHTML = "Addresses saved.";
	setTimeout(function() {
		status.innerHTML = "";
	}, 750);*/
}

// Restores select box state to saved value from localStorage.
function restoreOptions() {
	var addresses = localStorage["bitcoinAddresses"];
	if (!addresses) {
		return;
	}
	var select = document.getElementById("addresses");
	select.value=printAddresses(addresses);
}
document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector('#save').addEventListener('click', saveOptions);