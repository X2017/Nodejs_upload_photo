/**
 * Describe: 读取文件返回到上传页面
 * Created by ZhuYuan on 2017-03-11 20:16
 */

var fs = require("fs");
exports.getFolder = getFolder;
exports.getPhotoImages = getPhotoImages;
/**
 * 得到全部相册文件夹
 * @param callback
 */
function getFolder(callback){
    fs.readdir("./uploads", function(err,files){
        if(err){
            callback(err, null);
            console.log("没有找到文件夹");
            return;
        }
        var folder = [];
        (function itertiro(i){
            if(i == files.length){
                callback(null,folder);
                return;
            }
            fs.stat("./uploads/" + files[i], function(err,status){
                if(err){
                    callback(err, null);
                    console.log("找不到文件 " + files[i]);
                    return;
                }
                if(status.isDirectory()){
                    folder.push(files[i]);
                }
                itertiro(i + 1);
            });
        })(0);
    });
}

/**
 * 通过文件名得到所有图片
 * @param photoName
 * @param callback
 */
function getPhotoImages(photoName,callback){
    fs.readdir("./uploads/" + photoName, function(err,files){
        if(err){
            callback(err, null);
            console.log("没有找到文件夹");
            return;
        }
        var folder = [];
        (function itertiro(i){
            if(i == files.length){
                callback(null,folder);
                return;
            }
            fs.stat("./uploads/" + photoName + "/" + files[i], function(err,status){
                if(err){
                    callback(err, null);
                    console.log("找不到文件 " + files[i])
                    return;
                }
                if(status.isFile()){
                    folder.push(files[i]);
                }
                itertiro(i + 1);
            });
        })(0);
    });
}