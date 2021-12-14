document.getElementById("session_btn").addEventListener("click", function () {

    //果物名を入れた配列fruitsを作成
    var fruits = new Array("リンゴ", "ブドウ", "レモン");

    //配列をtoString()で文字列に変換し、変数str1に格納する
    var str1 = fruits.toString();
    alert(str1);

    //セッションストレージに変数str1をkey名「tostr」で書き込む
    sessionStorage.setItem("tostr", str1);

    //ストレージからkey名「tostr」のデータを変数str2に読み込む
    var str2 = sessionStorage.getItem("tostr");

    //配列arrを作成し、読み込んだデータを分割して格納する
    var arr = new Array();
    arr = str2.split(",");

    //配列の3番目の要素を表示
    alert(arr[2]);

}, false);
