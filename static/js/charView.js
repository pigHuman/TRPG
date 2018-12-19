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

function addBox(element){
        var addArea = element.parentNode.parentNode.parentNode.parentNode;
        var addElement = getFirstElementByClass(element.parentNode.parentNode.parentNode.parentNode,"original");
        var newStatus = cloneElements(addElement);
        newStatus.style.display = "block";
        addArea.appendChild(newStatus);
}

function delBox(element){
        var delBox = element.parentNode.parentNode.parentNode;
        delBox.parentNode.removeChild(delBox);
}

function textAreaHeightSet(argObj){

         argObj.style.height = "10px";
         var wSclollHeight = parseInt(argObj.scrollHeight);

         var wLineH = parseInt(argObj.style.lineHeight.replace(/px/, ''));

         if(wSclollHeight < (wLineH * 2)){wSclollHeight=(wLineH * 2);}

         argObj.style.height = wSclollHeight + "px";
}

function getJSON() {
  var req = new XMLHttpRequest();		  // XMLHttpRequest オブジェクトを生成する
  req.onreadystatechange = function() {		  // XMLHttpRequest オブジェクトの状態が変化した際に呼び出されるイベントハンドラ
    if(req.readyState == 4 && req.status == 200){ // サーバーからのレスポンスが完了し、かつ、通信が正常に終了した場合
      alert(req.responseText);		          // 取得した JSON ファイルの中身を表示
    }
  };
  req.open("GET", "http://http://52.90.62.136:8000/charView/", false); // HTTPメソッドとアクセスするサーバーの　URL　を指定
  req.send(null);					    // 実際にサーバーへリクエストを送信
}
