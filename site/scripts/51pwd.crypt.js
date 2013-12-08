/**
 *
 */
var DEBUG   = false ; // 调试开关
var VERSION = '1.1';  // 版本 
var SALTSTR = 'QwErTyUiOpLkJhGfDsAzXcVbNm<>()' ; // 自定义盐值，单机使用建议自行修改

/**
 * Fuck the password!
 */
function Fuck(){
    if("checked" == $("#ID_DEBUG").attr("checked")){
        DEBUG = true;
    }
    if(DEBUG){
        //alert('Fucking!');
    }
    var v_sitename = $("#ID_SITENAME").val();
    var v_mycipher = $("#ID_MYCIPHER").val();
    
    if(!InputValidate(v_sitename, v_mycipher)){
        return false;
    }
    var superpassword = CreateSuperPassword(v_sitename, v_mycipher);
    if(DEBUG){
        alert("超级密码：" + superpassword + "|" + superpassword.length) ;
    }
    // 来点动画效果
    $("#ID_RESULT").slideUp();
    $("#ID_RESULT").slideDown("fast", function() {
        $("#ID_S").val(GeneratePassword(superpassword,8));
        $("#ID_M").val(GeneratePassword(superpassword,14));
        $("#ID_L").val(GeneratePassword(superpassword,20));
        $("#ID_MYCIPHER").val("");
    });
    setTimeout(function(){
            $("#ID_S").val("");
            $("#ID_M").val("");
            $("#ID_L").val("");
          }, 1 * 60 * 1000);
    return true ;
}

/**
 * 生成超级密码
 */
function CreateSuperPassword(v_sitename, v_mycipher){
    //return MyCrypt20121009(VERSION, SALTSTR, v_sitename, v_mycipher);
    return MyCrypt20121016(VERSION, SALTSTR, v_sitename, v_mycipher);
}

/**
 * 加密算法2012-10-16
 */
function MyCrypt20121016(version, salt, v_sitename, v_mycipher){
    var md5_1, md5_2, md5_3,md5_4;
    md5_1 = $.md5(salt + v_sitename);
    md5_2 = $.md5(salt + v_mycipher);
    md5_3 = $.md5(md5_1 + salt + md5_2);
    md5_4 = $.md5(md5_3 + salt);
    base64str = $.base64.encode(md5_4) ;
    if(DEBUG){
        alert("md5_1:" + md5_1 + "\nmd5_2:" + md5_2+ "\nmd5_3:" + md5_3+ "\nmd5_4:" + md5_4 + "\nbase64:" + base64str);
    }
    return base64str ;
}

/**
 * 加密算法2012-10-09
 */
function MyCrypt20121009(version, salt, v_sitename, v_mycipher){
    var md5_1, md5_2, md5_3,md5_4;
    md5_1 = $.md5(salt + v_sitename);
    md5_2 = $.md5(salt + v_mycipher);
    md5_3 = $.md5(md5_1 + salt + md5_2);
    md5_4 = $.md5(md5_3 + salt);
    if(DEBUG){
        alert("md5_1:" + md5_1 + "\nmd5_2:" + md5_2+ "\nmd5_3:" + md5_3+ "\nmd5_4:" + md5_4);
    }
    return md5_4 ;
}

/**
 * 生成指定长度的密码
 */
function GeneratePassword(superpass, length){
    if(DEBUG){
        alert("GeneratePassword:" + superpass + "|" +  length);
    }
    if(length < 6){
        length = 6 ;
    }
    
    superpass = superpass.toUpperCase(); // 字符串转成大写

    var start = Math.ceil(length / 2) ;
    var temppass = [] ;      // 临时字母表
    var DigitalCount   = 0 ; // 临时字母表中数字的个数
    
    for(var i=0; i < length; i++){
        if(superpass.charAt(i + start ) <= '9' && superpass.charAt(i + start ) >= '0')
        {
            // 包含数字
            DigitalCount++ ; 
        }
        if((i + start) % 2 == 0){
            temppass.push(superpass.charAt(i + start ).toLowerCase());
        }
        else{
            temppass.push(superpass.charAt(i + start ));
        }
    }
    // 规避一个数字都没有的情况
    if(0 == DigitalCount){
        temppass.pop();
        temppass.push('0') ; 
    }
    if(DEBUG){
        alert("生成长度为" + length + "的密码：" + temppass.join(''));
    }
    return temppass.join('') ;
}

/**
 * 验证输入合法性
 */
function InputValidate(v_sitename, v_mycipher){
    if(v_sitename.length < 1){
        alert("Site name or domain should not be empty.\n网站名称不能为空啊^^");
        return false ;
    }
    
    if(v_mycipher.length < 5){
        alert("The minimum length of cipher is 5.\n暗语长度可以再长点，你懂的");
        return false ;
    }
    
    if(v_sitename == v_mycipher){
        alert("You cipher should be different from the site name or domain.\n网站名称和暗语不能相同");
        return false;
    }
    return true ;
}