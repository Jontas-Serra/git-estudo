var list = [
	{"desc":"rice", "amount": "1", "value":"5.40"},
	{"desc":"beer", "amount": "12", "value":"1.99"},
	{"desc":"meat", "amount": "1", "value":"15.00"}
];

function getTotal(list){
	var total = 0;
	for (var key in list) {
		total += list [key].value * list[key].amount;
	}
	return total;
}
function setList (list) {
	var table = '<thead><tr><td>Description</td><td>Amount</td><td>Value</td><td>Action</td></tr></thead><tbody';
	for (var key in list) {
		table += '<tr><td>'+ formatDesc(list[key].desc) +'</td><td>'+ formatAmount(list[key].amount) +'</td><td>'+ formatValue(list[key].value) +'</td><td><button class="btn btn-default" onclick="setUpdate('+key+');">Edit</button><button class="btn btn-default" onclick="DeleteData('+key+');">Delete</button></td>'; 
	}
	table += '</tbody>';
	document.getElementById("listTable").innerHTML = table;
}
function formatDesc (desc) {
	var str = desc.toLowerCase();
	str = str.charAt(0).toUpperCase() + str.slice(1);
	return str;
}
function formatValue(value) {
	var str = parseFloat(value).toFixed(2) + "";
	str = str.replace(".", ",");
	str = "$ " + str;
	return str;
}
function formatAmount(amount) {
	return parseInt;
}
function addData() {
	if(!validation()){
		return;
	}
	var desc = document.getElementById("desc").value;
	var amount = document.getElementById("amount").value;
	var value = document.getElementById("value").value;

	list.unshift({"desc":desc , "amount":amount ,"value":value});
	setList (list);

}
function setUpdate(id) {
	var obj = list[id];
	document.getElementById("desc").value = obj.desc;
	document.getElementById("amount").value = obj.amount;
	document.getElementById("value").value = obj.value;
	document.getElementById("btnUpdate").style.display = "inline-block";
	document.getElementById("bntAdd").style.display = "none";

	document.getElementById("inputUpdate").innerHTML = '<input id="idUpdate" type="hidden" value="'+id+'">';
}
function resetForm() {
	document.getElementById("desc").value = "";
	document.getElementById("amount").value = "";
	document.getElementById("value").value = "";	
	document.getElementById("btnUpdate").style.display = "none";
	document.getElementById("bntAdd").style.display = "inline-block";

	document.getElementById("inputUpdate").innerHTML = "";
}
function UpdateData(){
	if(!validation()){
		return;
	}
	var id = document.getElementById("idUpdate").value;
	var desc = document.getElementById("desc").value;
	var amount = document.getElementById("amount").value;
	var value = document.getElementById("value").value;

	list[id] = {"desc":desc,"amount":amount,"value":value};
	resetForm();
	setList (list);
 
}
function DeleteData (id) {
	if(confirm("Delete this itens?") ) {
		if(id === list.length - 1) {
			list.pop();
		} else if (id === 0) {
			list.shift();
		} else {
			var arrAuxIni = list.slice (0, id);
			var arrAuxEnd = list.slice(id + 1);
			list = arrAuxIni.concat(arrAuxEnd);
		}
		setList(list);
	}
}
function validation(){
	var desc = document.getElementById("desc").value;
	var amount = document.getElementById("amount").value;
	var value = document.getElementById("value").value;
	var errors = "";
	
	if(desc === "" ){
		errors =+ '<p>Fill out Description </p>';
	}
	if(amount === "" ){
		errors =+ '<p>Fill out quantity </p>';
	} else if (amount != parseInt (amount)) {
		errors =+ '<p>Fill out a valid amount </p>';
	}
	if(value === "" ){
		errors =+ '<p>Fill out value </p>';
	} else if (value != parseFloat (value)) {
		errors =+ '<p>Fill out a valid value </p>';
	}

	if (errors != "") {
		document.getElementById("errors").style.display = "block";
		document.getElementById("errors").innerHTML = "<h3>Error: </h3>" + errors;
		return 0;
	} else{
		return 1;
	}
}

setList	(list);
console.log(getTotal(list));
