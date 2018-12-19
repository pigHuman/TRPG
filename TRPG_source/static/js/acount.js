//与えられたclassを持つ最初の要素を返す
function getFirstElementByClass(node,className){
        var element = node.getElementsByClassName(className);
        element = element[0];
        return element;
}

window.onload = function onloads(){
        cloneCount = 0;
}

function acountConfig(){
        myPassWord=prompt("パスワードを入力してください","");
        
        //myPassWordをサーバへ送信し、照合結果を(True/False)で返す
        var passResult = "True";

        if(passResult == "True"){
                window.open("./acountConfig.html", "acountConfig", "width=500,height=500,top=150,left=500");
        }else{
                alert( "パスワードが違います" );
        }
        
}

