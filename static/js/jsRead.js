$.ajax({
    type: 'GET',
    url: 'localhost:8000/acountConfig/',
    dataType: 'json'
  }).then(
    function(json){
      var a = $("#a");
      json.forEach(function(val){
        a.append("<tr><td>" + val.username + "</td><td>"+ val.password + "</td></tr>");
      });
    },
    function(a,b,c){ // ここテキトーに書いてますので真に受けないでください。
      alert('ERROR');
      alert(a.status);
      alert(b);
      alert(c);
    }
  );
