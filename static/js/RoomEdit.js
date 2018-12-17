//与えられたclassを持つ最初の要素を返す
function getFirstElementByClass(node,className){
        var element = node.getElementsByClassName(className);
        element = element[0];
        return element;
}
//要素を複製して返す
function cloneElements(orgElement){
        cloneCount = cloneCount + 1;
        var cloneElement = orgElement.cloneNode(true);
        cloneElement.id = "clone" + cloneCount;
        return cloneElement;
}

window.onload = function onloads(){
        cloneCount = 0;
}

function sendCommit(){
        var data = '{"テスト":"ニッポン"}';
        console.log(data);
        execPost("http://172.20.234.107:8000/test",data);
}
function execPost(action, data) {
// フォームの生成
var form = document.createElement("form");
form.setAttribute("action", action);
form.setAttribute("method", "post");
form.style.display = "none";
document.body.appendChild(form);
// パラメタの設定
if (data !== undefined) {
        for (var paramName in data) {
        var input = document.createElement('input');
        input.setAttribute('type', 'hidden');
        input.setAttribute('name', paramName);
        input.setAttribute('value', data[paramName]);
        form.appendChild(input);
        }
}
// submit
form.submit();
}


