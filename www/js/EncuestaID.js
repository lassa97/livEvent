$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return results[1] || 0;
    }
}

// example.com?artistID=10&eventID=6
$.urlParam('artistID'); // 10
$.urlParam('eventID');  // 6

$('#artistID').val(decodeURIComponent($.urlParam('artistID')));
$('#eventID').val(decodeURIComponent($.urlParam('eventID')));