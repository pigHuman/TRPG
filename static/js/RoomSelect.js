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
        window.open("/roomEdit/", "roomEdit", "width=700,height=750,top=140,left=500");
}
