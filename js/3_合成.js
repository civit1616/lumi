function choice_3() {
    var list = document.getElementById('banner');
    if (list.childElementCount > 0) {
        while (list.firstChild) {
            list.removeChild(list.firstChild);
        }
    }
    var child = document.createElement('p');
    child.innerHTML = "合成元の素材★3を選択してください。（1/3）";
    list.appendChild(child);

    // 選択されたチェックボックスを確認
    /// 頭文字が★3のみ抽出
    var check = document.querySelectorAll("input[name=interesting]:checked");


}
