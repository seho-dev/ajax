/*
* 原生js封装ajax工具类
* writer: Shen
* Time:2018/11/30
* */



function $http(type, url, data, success, failed) {
    //创建ajax对象
    var xhr = null;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP')
    }

    //把传入的类型变成大写
    var type = type.toUpperCase();
    //清除缓存
    var random = Math.random();

    //如果传入的携带参数是一个对象
    if(typeof data === 'object') {
        //拼接参数字符串
        var str = '';
        //循环这个对象
        for (var key in data){
            str += key + '=' + data[key] + '&'
        }
        data = str.replace(/&$/, '');
    }

    //判断提交方法
    if(type == 'GET'){
        //如果data对象存在
        if(data){
            xhr.open('GET',url + '?' + data , true);
        }else{
            xhr.open('GET',url + '?t=' +random,true);
        }
        //发送请求
        xhr.send()
    }else if(type == 'POST'){
        xhr.open('POST',url,true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(data);
    }


    // 处理返回数据
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                success(xhr.responseText);
            } else {
                if(failed){
                    failed(xhr.status);
                }
            }
        }
    }
}
