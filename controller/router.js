/**
 * Describe: app控制进入的文件
 * Created by ZhuYuan on 2017-03-10 23:03
 */

var file = require("../models/file.js");
var formidable = require("formidable");
var path = require("path");
var sd = require("silly-datetime");
var fs = require("fs");
exports.showIndex = showIndex;
exports.showPhoto = showPhoto;
exports.showUp = showUp;
exports.doPost = doPost;

/**
 * 首页
 * @param req
 * @param res
 */
function showIndex(req,res){
    file.getFolder(function(err,folder){
        if(err){
            res.render("err");
            return;
        }
        res.render("index", {
            "folder" : folder
        });
    });
}

/**
 * 显示相片
 * @param req
 * @param res
 */
function showPhoto(req,res){
    var photoName = req.params.photo;
    file.getPhotoImages(photoName,function(err,imagesArray){
        if(err){
            res.render("err");
            return;
        }
        res.render("photo",{
            "photoName" : photoName,
            "images" : imagesArray
        });
    });
}

/**
 * 相片上传页
 * @param req
 * @param res
 */
function showUp(req,res){
    file.getFolder(function(err,folder){
        if(err){
            res.render("err");
            return;
        }
        res.render("up", {
            "folder" : folder
        });
    });
}

/**
 * 上传表单
 * @param req
 * @param res
 */
function doPost(req,res){

    var form = new formidable.IncomingForm();
    form.uploadDir = path.normalize(__dirname + "/../temp_uploads");
    form.parse(req, function(err, fields, files, next) {
        if(err){
            next();
            return;
        }
        var size = parseInt(files.file.size);
        // 临时存放的文件路径 修改和超过图片大小的都用这个
        var alterPath = files.file.path;
        if(size > (1048576 * 2)){
            res.json({"status":"上传的相片不能大于1MB"});
            fs.unlink(alterPath);
            return;
        }
        //新文件名由 时间 随机数 扩展名 组成
        var tt = sd.format(new Date(),"YYYYMMDDHHmm");
        var random = parseInt(Math.random() * 89999 + 10000);
        var extname = path.extname(files.file.name);
        var newPath =  path.normalize(__dirname + "/../uploads/" + fields.select + "/" + GetFileNameNoExt(files.file.name) + "_" + tt + "_" + random + extname);
        fs.rename(alterPath,newPath,function(err){
            if(err){
                res.json({"status":"上传改名失败"});
                return;
            }
            res.json({"status":"上传成功"});
        });
    });
}

/**
 * 取文件名不带后缀
 * @param filepath
 * @returns {string}
 * @constructor
 */
function GetFileNameNoExt(filepath) {
    if (filepath != "") {
        var names = filepath.split("\\");
        var pos = names[names.length - 1].lastIndexOf(".");
        return names[names.length - 1].substring(0, pos);
    }
}