



//今表示されている.displayのサイズを調整
function adjustDisplay(){
        var tabHeight = parseInt(tabArea.clientHeight) -3;
        curDisp.style.height = "calc(100% - " + tabHeight + "px)";
}
//与えられたclassを持つ最初の要素を返す
function getFirstElementByClass(node,className){
        var element = node.getElementsByClassName(className);
        element = element[0];
        return element;
}
//選択中の画像を削除する
function delObject(){
        curTarget.parentNode.removeChild(curTarget);
}
//選択中のタブを削除する
function delTab(){
        tabCount--;
        var index = tabList.indexOf(curTarget);
        var delDisp = displayList[index];
        displayList[index] = 0;
        tabList[index] = 0;
        layerList[index] = 0;
        curTarget.parentNode.removeChild(curTarget);
        delDisp.parentNode.removeChild(delDisp);
        adjustDisplay();

}


function moveBack(){
        var disp_Layer_List = layerList[displayList.indexOf(curDisp)];
        var pointer = disp_Layer_List.indexOf(curTarget);
        var wk = disp_Layer_List[pointer];
        disp_Layer_List.splice(pointer,1);
        disp_Layer_List.unshift(wk);
        for (i=0;i<pointer+1;i++){
                if (disp_Layer_List[i].style.zIndex>9){
                        disp_Layer_List[i].style.zIndex = i + 11;
                } 
        }
}

function moveFront(){
        var disp_Layer_List = layerList[displayList.indexOf(curDisp)];
        var pointer = disp_Layer_List.indexOf(curTarget);
        var wk = disp_Layer_List[pointer];
        disp_Layer_List.splice(pointer,1);
        disp_Layer_List.push(wk);
        for (i=pointer;i<disp_Layer_List.length;i++){
                if (disp_Layer_List[i].style.zIndex>9){
                        disp_Layer_List[i].style.zIndex = i + 11;
                } 
        }
}

function setBack(){
        curTarget.draggable = false;
        curTarget.style.zIndex = 9;
}

function fixBack(){
        curTarget.draggable = false;
        if (curTarget.style.zIndex<10){
                curTarget.style.zIndex = 10;
        }
}

function release(){
        curTarget.draggable = true;
        if (curTarget.style.zIndex<10){
                curTarget.style.zIndex = 10;
        }
}


function turnRight(){
        var currentrotate = curTarget.style.transform;
        currentrotate = currentrotate.replace("rotate(","");
        currentrotate = currentrotate.replace("deg)","");
        var X = parseInt(currentrotate,10) + 45;
        curTarget.style.transform = "rotate("+ X + "deg)";
}

function turnLeft(){
        var currentrotate = curTarget.style.transform;
        currentrotate = currentrotate.replace("rotate(","");
        currentrotate = currentrotate.replace("deg)","");
        var X = parseInt(currentrotate,10) - 45;
        curTarget.style.transform = "rotate("+ X + "deg)";
}

function turn180(){
        var currentrotate = curTarget.style.transform;
        currentrotate = currentrotate.replace("rotate(","");
        currentrotate = currentrotate.replace("deg)","");
        var X = parseInt(currentrotate,10) + 180;
        curTarget.style.transform = "rotate("+ X + "deg)";
}

function rollDice(){
        var dice = document.getElementById("dice").value;
        var rolls = document.getElementById("rolls").value;
        var rollResult = document.getElementById("rollResults");
        var rollList = [];
        var random = 0;
        var rollSum = 0;
        for(var i=0;i<rolls;i++){
                random = Math.floor((Math.random() * dice) + 1);
                rollSum+=random;
                rollList.push(random);
        }
        rollResult.innerHTML = "結果：" + rollList + "<br>合計：" + rollSum;

}


















//要素を複製して返す
function cloneElements(orgElement){
        cloneCount = cloneCount + 1;
        var cloneElement = orgElement.cloneNode(true);
        cloneElement.id = "clone" + cloneCount;
        return cloneElement;
}
//「タブ」を追加する
function addTab(){
        var newTab = cloneElements(orgTab);
        newTab.style.display = "block";
        var input = getFirstElementByClass(newTab,"inputBox");
        var text = getFirstElementByClass(newTab,"tabText");
        input.addEventListener("keydown",function(e){
                if(e.keyCode === 13){
                        if(this.value == ""){
                        }else{
                                text.textContent = this.value;
                        }
                        input.style.display = "none";
                        text.style.display = "block";
                        adjustDisplay();
                }
        },true);
        input.addEventListener("blur",function(e){
                if(this.value == ""){
                }else{
                        text.textContent = this.value;
                }
                input.style.display = "none";
                text.style.display = "block";
                adjustDisplay();
        },true);
        newTab.addEventListener("contextmenu",function(evt){
                evt.preventDefault();
                tabMenu.style.left = evt.pageX + "px";
                tabMenu.style.top = evt.pageY + "px";
                tabMenu.classList.add("on");
                curTarget = evt.currentTarget;
        },true);
        return newTab;
}

//「ディスプレイ」を追加する
function addDisplay(){
        var newDisp = cloneElements(orgDisplay);
        newDisp.style.display = "block";
        newDisp.addEventListener("drop", function(evt){
                evt.preventDefault();
                var ele = document.getElementById(evt.dataTransfer.getData("text"));

                var disp_Layer_List = layerList[displayList.indexOf(curDisp)];
                if (curDisp.querySelector("#" + ele.id)){
                        disp_Layer_List.push(ele);
                        var pointer = disp_Layer_List.indexOf(ele);
                        disp_Layer_List.splice(pointer,1);
                        for(i=pointer;i<disp_Layer_List.length;i++){
                                if (disp_Layer_List[i].style.zIndex>9){
                                        disp_Layer_List[i].style.zIndex = i + 11;
                                }
                        }
                }else{
                        ele = ele.cloneNode(true);
                        ele.id = "disp_image" + count;
                        ele.addEventListener("dragstart",function(evt){
                                evt.dataTransfer.setData("text",evt.currentTarget.id);
                        },true);
                        ele.addEventListener("contextmenu",function(evt){
                                evt.preventDefault();
                                imageMenu.style.left = evt.pageX + "px";
                                imageMenu.style.top = evt.pageY + "px";
                                imageMenu.classList.add("on");
                                curTarget = evt.currentTarget;
                        },true);
                        disp_Layer_List.push(ele);
                        ele.style.zIndex = disp_Layer_List.length + 10;
                        ele.style.transform = "rotate(0deg)";
                        count++;
                }
                
                var clientRect = curDisp.getBoundingClientRect() ;
                var positionX = clientRect.left + window.pageXOffset ;
                var positionY = clientRect.top + window.pageYOffset ;
                iconY = ele.getBoundingClientRect().height;
                iconX = ele.getBoundingClientRect().width;
                screenY = curDisp.getBoundingClientRect().height;
                screenX = curDisp.getBoundingClientRect().width;
                iconRelativeY = evt.clientY - positionY - iconY/2;
                iconRelativeX = evt.clientX - positionX - iconX/2;
                ele = curDisp.appendChild(ele);
                ele.style.position = "absolute";
                ele.style.top = 100 * iconRelativeY/screenY +"%";
                ele.style.left = 100 * iconRelativeX/screenX +"%";
                curDisp.style.backgroundColor = "#ffffff";
        }, true);       
        newDisp.addEventListener("dragenter",function(evt){
                evt.preventDefault();
                newDisp.style.backgroundColor = "#eeffff";
        },true);
        newDisp.addEventListener("dragleave",function(evt){
                evt.preventDefault();
                newDisp.style.backgroundColor = "#ffffff";
        },true);
        newDisp.addEventListener("dragover",function(evt){
                evt.preventDefault();
        },true);
        return newDisp;
}

//選択中のタブを一番右に移動させる
function moveTabRight(){
        if (tabCount>0){
                curTab.classList.remove("viewingTab");
                curTab.classList.add("lastTab");
                tabArea.appendChild(curTab);
        }
}

function imageUpload(element){
        element.id = "dragNo"+imageCount;
        element.addEventListener("dragstart",function(evt){
                evt.dataTransfer.setData("text",evt.currentTarget.id);
        },true);
        imageCount++;
        imageArea.appendChild(element);
}

function dropEnable(){
        imageArea.addEventListener("dragenter",function(evt){
                evt.preventDefault();
                imageArea.style.backgroundColor = "#eeffff";
        },true);
        imageArea.addEventListener("dragleave",function(evt){
                evt.preventDefault();
                imageArea.style.backgroundColor = "#ffffff";
        },true);
        imageArea.addEventListener("dragover",function(evt){
                evt.preventDefault();
        },true);
        imageArea.addEventListener("drop",function(evt){
                evt.preventDefault();
                var files = evt.dataTransfer.files;
                for (var i=0; i<files.length; i++) {
                        if (!files[i] || files[i].type.indexOf('image/') < 0) {
                                continue;
                        }
                        imageUpload(files[i]);
                }
        },true);
}


//読み込み時に.displayのサイズを調整する
window.onload = function onloads(){
        curTab = 0;
        curDisp = 0;
        tabArea = document.getElementById('mainTab');
        dispArea = document.getElementById('center');
        orgTab = document.getElementById("orgTab");
        orgDisplay = document.getElementById("orgDisplay");
        curTarget = 0;
        tabCount = 0;
        cloneCount = 0;
        displayCount = 0;
        tabList = [];
        displayList = [];
        layerList = [];
        count = 0;
        dataMove = 0;
        itemList = document.querySelectorAll("#images img");
        imageMenu = document.getElementById("imageMenu");
        tabMenu = document.getElementById("tabMenu");
        body = document.body;
        imageArea = document.getElementById("images");
        imageCount = 0;
        dropEnable();
        clickTabAdd();
        adjustDisplay();

        
}
//ウィンドウの基本設定
window.addEventListener("load",function(){
        for(var i=0;i<itemList.length;i++){
                itemList[i].draggable = true;
                itemList[i].id = "dragNo"+imageCount;
                itemList[i].addEventListener("dragstart",function(evt){
                        evt.dataTransfer.setData("text",evt.currentTarget.id);
                },true);
                imageCount++;
        }
        body.addEventListener('click',function(){
                if(imageMenu.classList.contains('on')){
                        imageMenu.classList.remove('on');
                }
                if(tabMenu.classList.contains('on')){
                        tabMenu.classList.remove('on');
                }
        });
},true);
//ブラウザのリサイズ自に.displayのサイズを調整する
window.onresize = function onresizies(){
        adjustDisplay();
        try{
                moveTabRight();
        }
        catch(e){
        }
}
//「タブ追加」をクリックした時の動作
function clickTabAdd(){
        tabCount++;
        var newTab = addTab();
        tabArea.appendChild(newTab);
        var newDisp = addDisplay();
        dispArea.appendChild(newDisp);
        try{
                curDisp.style.display = "none";
        }catch(e){
        }
        curDisp = newDisp;
        curTab = newTab;
        tabList.push(newTab);
        displayList.push(newDisp);
        layerList.push([]);
        clickTab(newTab);
        adjustDisplay();
}

//「タブ」をクリックした時の動作
function clickTab(element){
        curTab = element;
        var index = tabList.indexOf(curTab);
        curDisp.style.display = "none";
        curDisp = displayList[index];
        curDisp.style.display = "block";
        var rect = curDisp.getBoundingClientRect();
        try{
                var lastTab = getFirstElementByClass(document,"lastTab");
                lastTab.classList.remove("lastTab");
        }
        catch(e){
        }
        try{
                var viewingTab = getFirstElementByClass(document,"viewingTab");
                viewingTab.classList.remove("viewingTab");
        }
        catch(e){
        }
        if (rect.top <= 40){
                curTab.classList.add("viewingTab");
        }else{
                curTab.classList.add("lastTab");
                tabArea.appendChild(curTab);
        }
        adjustDisplay();   
} 
//「タブ」をダブツクリックした時の動作
function dblClickTab(element){
        if (getFirstElementByClass(element,"inputBox")){
                var inputbox = getFirstElementByClass(element,"inputBox");
        }else{
                var inputbox = document.createElement("input");
                inputbox.setAttribute("type","text");
                inputbox.setAttribute("class","inputBox");
                element.appendChild(inputbox);
        }
        var textlength = element.getBoundingClientRect().width - 16;
        inputbox.style.width = textlength + "px";
        inputbox.style.display = "block";
        var text = getFirstElementByClass(element,"tabText");
        text.style.display = "none";
        inputbox.value = text.textContent.trim();
        inputbox.focus();     
}   


function characterSelect(){
        window.open("/charSelect/", "characterSelect", "width=500,height=500,top=100,left=100");
}

function roomSelect(){
        window.open("/roomSelect/", "roomSelect", "width=500,height=500,top=100,left=100");
}


