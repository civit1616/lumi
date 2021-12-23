var check_total = 0
var check1_id = 0
var check2_id = 0


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
        container.addClass('active');
        return false;
    });

    // 合成処理
    /// 合成グループ取得（IDの末尾）
    /// 合成判定
    /// HTML作成
    /// 右枠のinnerHTMLを編集

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
