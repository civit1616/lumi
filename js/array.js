var arr = ["test", "Green", "Blue", "white", "black"];

function change() {

    //適当な配列を用意


    //配列をliタグにしてフロントに表示
    var text = [];
    for (var i = 0; i < arr.length; i++) {
        text.push('<li>' + arr[i] + '</li>');
    }
    //innerHTMLを使用して表示
    var txt = document.getElementById("txt");
    txt.innerHTML = text.join('');

}

function count() {

    // 親要素
    var list = document.getElementById('txt');

    // 子要素の数
    var num = list.childElementCount;

    var arr_length = '';
    arr_length += num;
    var count_txt = document.getElementById("count_txt");
    count_txt.innerHTML = arr_length + "個";

}

function random() {
    // 親要素
    var list = document.getElementById('txt');

    //適当な配列を用意
    const num = Math.floor(Math.random() * 3)
    const result = ['★5', '★4', '★3'][num]

    // 追加する要素を作成
    var child = document.createElement('li');
    child.innerHTML = result;

    // 子要素に追加
    list.appendChild(child);
}

function createinput() {
    // 要素取得
    const div1 = document.getElementById("lumi1");

    const input1 = document.createElement("input");
    input1.type = "checkbox";
    input1.name = "★1";
    input1.value = "★1";
    input1.id = "★1";
    const text1 = document.createTextNode("★1");
    const Label1 = document.createElement("label");
    Label1.htmlFor = input1.id;
    Label1.appendChild(input1);
    Label1.appendChild(text1);
    // 新規要素
    div1.appendChild(Label1);
    div1.append(document.createElement("br"));


}
