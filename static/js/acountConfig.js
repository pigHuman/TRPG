//与えられたclassを持つ最初の要素を返す
function getFirstElementByClass(node,className){
    var element = node.getElementsByClassName(className);
    element = element[0];
    return element;
}

$.fn.jsonAllocator = function(json){
    for(user in json) {
        this.find('[data-name="' + user + '"]').html(json[user]);
    }
}

window.onload = function onloads(){

    cloneCount = 0;
}
