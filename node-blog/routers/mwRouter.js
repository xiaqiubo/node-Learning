/**
 * Created by Administrator on 2017/6/21.
 */
const userModel = require('../modules/data').user;
const optionModel = require('../modules/data').option;
const app = require('express')();
// 此文件为路由中间件
module.exports.admin=admin;
module.exports.check_user_authority=check_user_authority;  // 检查用户权限
module.exports.check_user_form=check_user_form;             // 检查用户登录注册表单
module.exports.check_user_loged=check_user_loged;           // 检查用户是否登录
module.exports.check_username_signed=check_username_signed; // 检查用户是否已被注册
module.exports.siteViews=siteViews; // 站点访问量


// 定义返回信息
const reMessage = {
    code : 0,
    msg:'注册成功'
}


function admin(req,res,next){
     // console.log(req.session);
    next();
}

function siteViews(req,res,next){

    (async function(){

        // 判断数据库是否已经存在站点浏览量的项
        let views = await optionModel.findOne({name:'views'});

        // 如果不存在则创建该项,并赋值为1
        if(!views){
            await optionModel.create({name:'views',value:1});
            return;
        }

        await views.update({$inc:{value:1}});

    })();

    next();
}

// 注册或登录表单验证
function check_user_form(req,res,next){
    // 验证登录信息
    if(req.session.login){
        reMessage.code='1004';
        reMessage.msg='您已登录无需注册或重复登录';
        res.send(reMessage);
        return;
    }
    // 验证用户名和密码信息
    if(!(req.body.username&&req.body.password)){
        reMessage.code='1003';
        reMessage.msg='用户名密码均不能为空';
        res.send(reMessage);
        return;
    }

    next();
}

// 验证用户必须登录
function check_user_loged(req,res,next){
    // 验证登录信息
    if(!req.session.login){
        reMessage.code='1000';
        reMessage.msg='当前页面需登录后查看';
        res.send(reMessage);
        return;
    }
    next();
}

// 检查用户权限
function check_user_authority(req,res,next){
    // 调用用户权限
    // console.log(req.session.user.authority);
    next();
}

// 检查用户名是否已被注册
function check_username_signed(req,res,next){
    userModel.findOne({username:req.body.username})
        .then((data)=>{
            if(data){
                reMessage.code='1002';
                reMessage.msg='当前用户名已存在';
                res.send(reMessage);
                return;
            }
            next();
        });
}
