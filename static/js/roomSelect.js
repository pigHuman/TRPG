//与えられたclassを持つ最初の要素を返す
function getFirstElementByClass(node,className){
        var element = node.getElementsByClassName(className);
        element = element[0];
        return element;
}

window.onload = function onloads(){
        curChar = getFirstElementByClass(document,"midori")
}


function editRoom(){
        window.open("/roomEdit/", "roomEdit", "width=500,height=110,top=300,left=500");
}

function roomClick(element){
        window.open("/roomIn/", "roomEntry", "width=300,height=30,top=350,left=350");
}

