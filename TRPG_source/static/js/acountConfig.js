//与えられたclassを持つ最初の要素を返す
function getFirstElementByClass(node,className){
    var element = node.getElementsByClassName(className);
    element = element[0];
    return element;
}

window.onload = function onloads(){
    cloneCount = 0;
}