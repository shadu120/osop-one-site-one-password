// powered by shadu{at}foxmail.com  2013-12-02
// http://i.isclab.org
$(document).ready(function(){
    CreateQRC('http://www.51pwd.com');
});

function CreateQRC(strUrl){
    if(strUrl == "")
        strUrl = "http://www.51pwd.com";
    $('#qrcode').qrcode(strUrl);
}