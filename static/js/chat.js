var milkcocoa = new MilkCocoa('teajp9iurrb');
var chatDataStore = milkcocoa.dataStore("chat");
var textArea, ul;


/**
 * ロード時処理
 * 5件のデータを読み込む
 */
window.onload = function() {
    nameArea = document.getElementById("nameArea");
    textArea = document.getElementById("messageArea");
    ul = document.getElementById('pullDataArea');
    getText();
}

/**
 * データ追加ボタンを押された時の処理
 */
function pushData() {
    var text = nameArea.value + ":" + textArea.value;
    sendText(text);
}

function sendText(text) {
    chatDataStore.push({user:name,message: text}, function(data) {});
    textArea.value = "";
}

function pullData() {
    removePullData();
    getText();
}

/**
 * 新しい順に5つデータを取得
 */
function getText() {
    chatDataStore.stream().size(10).sort('desc').next(function(err, data) {
        addPullData(data);
    });
}
function addPullData(data) {
    for (var i = data.length - 1; i >= 0; i--) {
        var li = document.createElement('li');
        ul.appendChild(li);
        li.innerHTML = data[i].value.message;
    }
}


/**
 * 表示しているデータを画面上から削除
 */
function removePullData() {
    for (var i = ul.childNodes.length - 1; i >= 0; i--) {
        ul.removeChild(ul.childNodes[i]);
    }
}