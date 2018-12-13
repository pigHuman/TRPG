//与えられたclassを持つ最初の要素を返す
function getFirstElementByClass(node,className){
        var element = node.getElementsByClassName(className);
        element = element[0];
        return element;
}

window.onload = function onloads(){
        curChar = getFirstElementByClass(document,"midori")
}


function useCharacter(element){
        if(curChar!=element){
                curChar.parentNode.style.background = "#15e448";
                getFirstElementByClass(curChar,"innerTexts").innerText = "使用する";
                curChar=element;
        }
        var innerText = getFirstElementByClass(element,"innerTexts");
        if(getFirstElementByClass(element,"innerTexts").innerText == "使用する"){
                element.parentNode.style.background = "rgb(240, 98, 50)";
                innerText.innerText = "選択中";
        }else{
                element.parentNode.style.background = "#15e448";
                innerText.innerText = "使用する";
        }
}

function viewCharacter(element){
        window.open("/charEdit/", "characterSeet", "width=700,height=750,top=140,left=500");
}

function createCharacter(){
        window.open("/charCreate/", "characterSeet", "width=700,height=750,top=140,left=500");
}
