const GROUP_NUM = 5
var total_num = 0
const GACHA_LOOP_NUM = 10
const RAND_NUM = 100
const GACHA = ['★1', '★2', '★3', '★4', '★5']
var arr = [[], [], [], [], []]
var flag = [false, false, false, false, false]

function random_10times() {
    // ログ用
    var log = [0, 0, 0, 0, 0]
    //抽選部分
    for (var i = 0; i < GACHA_LOOP_NUM; i++) {
        var num = Math.floor(Math.random() * RAND_NUM)
        var index = 0
        var result = "";
        // 3:3% 2:10% 1:87%
        if (num <= 87) {
            result = GACHA[0];
            index = 0;
        } else if (num > 87 && num <= 97) {
            result = GACHA[1];
            index = 1;
        } else {
            result = GACHA[2];
            index = 2;
        }
        //配列に追加
        arr[index].push(result);
        flag[index] = true;
        // ログ
        log[index] = log[index] + 1;
    }

    // 自動合成
    /// ★1
    var success = [0, 0];
    var failure = [0, 0];
    if (arr[0].length >= 3) {


        while (arr[0].length >= 3) {
            var num = Math.floor(Math.random() * RAND_NUM)
            if (num <= 70) {
                arr[1].push(GACHA[1]);
                arr[0].pop();
                arr[0].pop();
                arr[0].pop();
                success[0] = success[0] + 1;
                flag[1] = true;
            } else {
                arr[0].pop();
                arr[0].pop();
                failure[0] = failure[0] + 1;
            }
        }
        flag[0] = true;
    }
    /// ★2
    if (arr[1].length >= 3) {
        while (arr[1].length >= 3) {
            var num = Math.floor(Math.random() * RAND_NUM)
            if (num <= 35) {
                arr[2].push(GACHA[2]);
                arr[1].pop();
                arr[1].pop();
                arr[1].pop();
                success[1] = success[1] + 1;
                flag[2] = true;
            } else {
                arr[1].pop();
                arr[1].pop();
                failure[1] = failure[1] + 1;

            }
        }
        flag[1] = true;
    }

    // フロントに反映
    for (var i = 0; i < GROUP_NUM; i++) {
        if (flag[i]) {
            // 変化があったグループを参照
            var list = document.getElementById('txt' + String(i + 1));
            // 表示されているデータを一度削除
            while (list.firstChild) {
                list.removeChild(list.firstChild);
            }
            for (var j = list.childElementCount / 2; j < arr[i].length; j++) {
                // 追加されたデータをHTML要素に変換
                var label = set_table_element(i, j);
                list.appendChild(label);
                list.append(document.createElement("br"));
            }
            flag[i] = false;
        }
    }

    // トータル値の反映
    total_num = total_num + 1;
    var total_num_dom = document.getElementById('total_random');
    total_num_dom.innerHTML = "合計" + String(total_num * 10) + "+" + String(total_num) + "連, " + String(total_num * 8000) + "ギア, " + String(total_num * 2200) + "円";

    // データログ（抽選結果）
    /// 親要素取得
    var list = document.getElementById('data_log');
    /// 現在時刻
    const date1 = new Date();
    var child = document.createElement('li');
    var log_str = "";
    for (var i = 2; i >= 0; i--) {
        log_str = log_str + '★' + String(i + 1) + " : " + log[i] + "個、    ";
    }
    child.innerHTML = "[ " + date1.toLocaleString() + " ]  ＜抽選結果＞ " + log_str;
    list.prepend(child);
    /// データログ（自動合成）
    /// ログデータ確認
    var list = document.getElementById('data_log_auto');
    var child = document.createElement('li');
    log_str = "";
    log_str = "★3：(成功)" + String(success[1]) + "回、(失敗)" + String(failure[1]) + "回、★2：(成功)" + String(success[0]) + "回、(失敗)" + String(failure[0]) + "回";
    child.innerHTML = "[ " + date1.toLocaleString() + " ] ＜自動合成＞" + log_str;
    list.prepend(child);

}

// checkbox要素の作成
function set_table_element(group_num, child_element_num) {
    var input1 = document.createElement("input");
    var str_id = "★" + String(group_num + 1) + "_" + String(child_element_num + 1);
    input1.type = "checkbox";
    input1.name = str_id;
    input1.className = "checkbox";
    input1.value = str_id;
    input1.id = (child_element_num + 1) * 10 + group_num + 1;
    var text1 = document.createTextNode(str_id); // HTMLページに表示されるテキスト
    var Label1 = document.createElement("label");
    Label1.htmlFor = input1.id;
    Label1.appendChild(input1);
    Label1.appendChild(text1);
    return Label1
}
