$(function(){

//HTMLを初期化
$("table.tbl tbody").html("");

//HTMLを生成
$.getJSON("localhost:8000/acountConfig/", function(data){
$(data.users).each(function(){
$('<tr>'+
'<th>'+this.day+'</th>'+
'<td class="label"><span class="' + this.username + '">' +
this.password + '</span></td>'+
'</tr>').appendTo('table.tbl tbody');
})
})
});
