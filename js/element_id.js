var current = new Date();
var result = document.getElementById('result');
result.textContent = current.toLocaleString();

var list = document.getElementsByTagName('a');
for (var i = 0, len = list.length; i < len; i++) {
    console.log(list.item(i).href)

}


var nam = document.getElementsByName('time');
nam[0].value = current.toLocaleTimeString();
