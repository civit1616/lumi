const GROUP_NUM = 5
var total_num = 0
const GACHA_LOOP_NUM = 10
const RAND_NUM = 100
const RAND_NUM2 = 6
const RAND_NUM3 = 11
const GACHA = ['★1_', '★2_', '★3_', '★4_', '★5_']
const GACHA2 = ['猛攻の', '制御の', '運命の', '保護の', '支援の', '覚醒の']
const GACHA3 = ['や座', 'さいだん座', 'ドラゴン座', 'わし座', 'みなみじゅうじ座', 'やまねこ座', 'たて座', 'こと座', 'うみへび座', 'かんむり座', 'コンパス座']
var arr = [[], [], [], [], []]
var flag = [false, false, false, false, false]
var total_miss3 = 0
var total_suc3 = 0
var total_suc4 = 0
var total_miss4 = 0

function get_names() {
    // 色
    var num1 = Math.floor(Math.random() * RAND_NUM2);
    var str1 = GACHA2[num1];
    var num2 = Math.floor(Math.random() * RAND_NUM3);
    var str2 = GACHA3[num2];
    return str1 + str2
}

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
            result = GACHA[0] + get_names();
            index = 0;
        } else if (num > 87 && num <= 97) {
            result = GACHA[1] + get_names();
            index = 1;
        } else {
            result = GACHA[2] + get_names();
            index = 2;
        }
        //配列に追加
        arr[index].push(result);
        flag[index] = true;
        // ログ
        log[index] = log[index] + 1;
    }
    var num = Math.floor(Math.random() * RAND_NUM)
    var index = 0
    var result = "";
    // 3:3% 2:97%
    if (num <= 97) {
        result = GACHA[1] + get_names();
        index = 1;
    } else {
        result = GACHA[2] + get_names();
        index = 2;
    }
    //配列に追加
    arr[index].push(result);
    flag[index] = true;
    // ログ
    log[index] = log[index] + 1;

    // 自動合成
    /// ★1
    var success = [0, 0];
    var failure = [0, 0];
    if (arr[0].length >= 3) {


        while (arr[0].length >= 3) {
            var num = Math.floor(Math.random() * RAND_NUM)
            if (num <= 70) {
                arr[1].push(GACHA[1] + get_names());
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
                arr[2].push(GACHA[2] + get_names());
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
    input1.value = arr[group_num][child_element_num];
    input1.id = (child_element_num + 1) * 10 + group_num + 1;
    var text1 = document.createTextNode(input1.value); // HTMLページに表示されるテキスト
    var Label1 = document.createElement("label");
    Label1.htmlFor = input1.id;
    Label1.appendChild(input1);
    Label1.appendChild(text1);
    return Label1
}


var check_total = 0
var check1_id = 0
var check2_id = 0
var check3_id = 0


$(document).on('change', 'input[type="checkbox"]', function () {
    // 1つ目の選択
    if (check_total == 0) {
        // val取得→HTML書き換え
        var v = $('input[type="checkbox"]:checked').val();
        document.getElementById("select1").innerHTML = v;
        // id取得→内部で保存
        var id = $('input[type="checkbox"]:checked').attr("id");
        check1_id = id;
        // 現在のチェック数をカウント
        check_total = 1;
    } else if (check_total == 1) {
        // 2つ目の選択
        $('input[type="checkbox"]:checked').each(function () {
            var id = $(this).attr("id");
            // 既に選択されたIDならスキップ
            // 残：別のグレードの場合はエラーになる
            if (id != check1_id) {
                var v = $(this).val();
                document.getElementById("select2").innerHTML = v;
                check2_id = id;
                check_total = 2;
            }
        });
    } else {
        // 3つ目の選択
        $('input[type="checkbox"]:checked').each(function () {
            var id = $(this).attr("id");
            // 既に選択されたIDならスキップ
            // 残：別のグレードの場合はエラーになる
            if (id != check1_id & id != check2_id) {
                var v = $(this).val();
                document.getElementById("select3").innerHTML = v;
                check_total = 3;
                check3_id = id
            }
        });
    }

});

// リセット
function reset_checkbox() {
    // チェックボックスをリセット
    const el = document.getElementsByClassName("checkbox");
    //全てのチェックボックスにチェックをはずす
    for (let i = 0; i < el.length; i++) {
        el[i].checked = false;
    }
    // select1,2,3のHTML、設定IDをリセット
    document.getElementById("select1").innerHTML = "";
    document.getElementById("select2").innerHTML = "";
    document.getElementById("select3").innerHTML = "";

    check_total = 0;
    check1_id = 0;
    check2_id = 0;

}


$(function () {
    // 残：エラーチェック
    //check_totalが3でないならアラート

    //select1,2,3のvalueの末尾が同じでないならアラート

    // 変数に要素を入れる
    var close = $('.modal-close'),
        container = $('.modal-container');

    //開くボタンをクリックしたらモーダルを表示する
    $("button[name='gousei']").click(function () {
        if (check_total != 3) {
            alert('エラー：選択が３つでない');
            return false
        }
        var check1 = Number(check1_id.slice(-1));
        var check1id_num = Number(check1_id.slice(0, -1));
        var check2 = Number(check2_id.slice(-1));
        var check2id_num = Number(check2_id.slice(0, -1));
        var check3 = Number(check3_id.slice(-1));
        var check3id_num = Number(check3_id.slice(0, -1));
        if (check1 != check2 || check2 != check3 || check1 != check3) {
            alert('エラー：異なったレアが選択');
            return false
        }

        // 合成処理
        if (check1 == 3) {
            var num = Math.floor(Math.random() * 100)
            if (num < 35) {
                // 成功, 次のレアのHTML作成
                // 次のレアの要素数集計
                var new_name = GACHA[check1] + get_names()
                arr[check1].push(new_name);
                var list = document.getElementById('txt' + String(check1 + 1));
                if (list != null) {
                    while (list.firstChild) {
                        list.removeChild(list.firstChild);
                    }
                    var childnum = list.childElementCount / 2;

                } else {
                    var childnum = 0;
                }
                for (var j = childnum; j < arr[check1].length; j++) {
                    // 追加されたデータをHTML要素に変換
                    var label = set_table_element(check1, j);
                    console.log(label);
                    list.appendChild(label);
                    list.append(document.createElement("br"));
                }
                // 対応するIDのHTMLを削除
                // arr上から削除して、再度HTMLを作成
                /// IDの大きい方から削除する
                var id_list = [];
                id_list.push(check1id_num);
                id_list.push(check2id_num);
                id_list.push(check3id_num);
                id_list.sort(
                    function (a, b) {
                        return (a < b ? 1 : -1);
                    }
                );

                arr[check1 - 1].splice(id_list[0] - 1, 1);
                arr[check2 - 1].splice(id_list[1] - 1, 1);
                arr[check3 - 1].splice(id_list[2] - 1, 1);
                var list = document.getElementById('txt' + String(check1));
                while (list.firstChild) {
                    list.removeChild(list.firstChild);
                }
                for (var j = list.childElementCount / 2; j < arr[check1 - 1].length; j++) {
                    var label = set_table_element(check1 - 1, j);
                    list.appendChild(label);
                    list.append(document.createElement("br"));
                }
                reset_checkbox();

                // モーダルＨＴＭＬの作成
                var modal_list = document.getElementById('modal_txt');
                while (modal_list.firstChild) {
                    modal_list.removeChild(modal_list.firstChild);
                }
                modal_list.innerHTML = "[成功] " + new_name + "を追加しました";

                total_suc3 = total_suc3 + 1;
                // 

            } else {
                // 失敗
                // 対応するIDのHTMLを削除
                // arr上から削除して、再度HTMLを作成
                var id_list = [];
                id_list.push(check2id_num);
                id_list.push(check3id_num);
                id_list.sort(
                    function (a, b) {
                        return (a < b ? 1 : -1);
                    }
                );

                arr[check2 - 1].splice(id_list[0] - 1, 1);
                arr[check3 - 1].splice(id_list[1] - 1, 1);
                var list = document.getElementById('txt' + String(check1));
                while (list.firstChild) {
                    list.removeChild(list.firstChild);
                }
                for (var j = list.childElementCount / 2; j < arr[check1 - 1].length; j++) {
                    var label = set_table_element(check1 - 1, j);
                    list.appendChild(label);
                    list.append(document.createElement("br"));
                }
                reset_checkbox();
                // モーダルＨＴＭＬの作成
                var modal_list = document.getElementById('modal_txt');
                while (modal_list.firstChild) {
                    modal_list.removeChild(modal_list.firstChild);
                }
                modal_list.innerHTML = "[失敗] ";

                total_miss3 = total_miss3 + 1;
            }
        }
        if (check1 == 4) {
            var num = Math.floor(Math.random() * 100)
            if (num < 20) {
                // 成功, 次のレアのHTML作成
                // 成功, 次のレアのHTML作成
                // 次のレアの要素数集計
                var new_name = GACHA[check1] + get_names()
                arr[check1].push(new_name);
                var list = document.getElementById('txt' + String(check1 + 1));
                if (list != null) {
                    while (list.firstChild) {
                        list.removeChild(list.firstChild);
                    }
                    var childnum = list.childElementCount / 2;

                } else {
                    var childnum = 0;
                }
                for (var j = childnum; j < arr[check1].length; j++) {
                    // 追加されたデータをHTML要素に変換
                    var label = set_table_element(check1, j);
                    console.log(label);
                    list.appendChild(label);
                    list.append(document.createElement("br"));
                }
                // 対応するIDのHTMLを削除
                // arr上から削除して、再度HTMLを作成
                /// IDの大きい方から削除する
                var id_list = [];
                id_list.push(check1id_num);
                id_list.push(check2id_num);
                id_list.push(check3id_num);
                id_list.sort(
                    function (a, b) {
                        return (a < b ? 1 : -1);
                    }
                );

                arr[check1 - 1].splice(id_list[0] - 1, 1);
                arr[check2 - 1].splice(id_list[1] - 1, 1);
                arr[check3 - 1].splice(id_list[2] - 1, 1);
                var list = document.getElementById('txt' + String(check1));
                while (list.firstChild) {
                    list.removeChild(list.firstChild);
                }
                for (var j = list.childElementCount / 2; j < arr[check1 - 1].length; j++) {
                    var label = set_table_element(check1 - 1, j);
                    list.appendChild(label);
                    list.append(document.createElement("br"));
                }
                reset_checkbox();

                // モーダルＨＴＭＬの作成
                var modal_list = document.getElementById('modal_txt');
                while (modal_list.firstChild) {
                    modal_list.removeChild(modal_list.firstChild);
                }
                modal_list.innerHTML = "[成功] " + new_name + "を追加しました";

                total_suc4 = total_suc4 + 1;
            } else {
                // 失敗
                var id_list = [];
                id_list.push(check2id_num);
                id_list.push(check3id_num);
                id_list.sort(
                    function (a, b) {
                        return (a < b ? 1 : -1);
                    }
                );

                arr[check2 - 1].splice(id_list[0] - 1, 1);
                arr[check3 - 1].splice(id_list[1] - 1, 1);
                var list = document.getElementById('txt' + String(check1));
                while (list.firstChild) {
                    list.removeChild(list.firstChild);
                }
                for (var j = list.childElementCount / 2; j < arr[check1 - 1].length; j++) {
                    var label = set_table_element(check1 - 1, j);
                    list.appendChild(label);
                    list.append(document.createElement("br"));
                }
                reset_checkbox();
                // モーダルＨＴＭＬの作成
                var modal_list = document.getElementById('modal_txt');
                while (modal_list.firstChild) {
                    modal_list.removeChild(modal_list.firstChild);
                }
                modal_list.innerHTML = "[失敗] ";

                total_miss4 = total_miss4 + 1;
            }
        }


        /// 合計失敗、成功数をHTMLで書き出し
        var dom1 = document.getElementById('lumi4_txt');
        dom1.innerHTML = "★4チャレ成功：" + String(total_suc3) + ", ★4チャレ失敗：" + String(total_miss3);
        var dom2 = document.getElementById('lumi5_txt');
        dom2.innerHTML = "★5チャレ成功：" + String(total_suc4) + ", ★5チャレ失敗：" + String(total_miss4);


        container.addClass('active');



        return false;
    });

    //閉じるボタンをクリックしたらモーダルを閉じる
    close.on('click', function () {
        container.removeClass('active');
    });

    //モーダルの外側をクリックしたらモーダルを閉じる
    $(document).on('click', function (e) {
        if (!$(e.target).closest('.modal-body').length) {
            container.removeClass('active');
        }
    });
});


