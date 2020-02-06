var usermodel=require('../models/auth.model.js')

const vr=require('express-validator').validationResult

exports.getsignUp=(req,res,next)=>{
    
    res.render('signup',{
    vError:req.flash('vErr'),
    autherr:req.flash('autherr'),
    isUser:req.session.userId,
    isAdmin:req.session.isAdmin,
    title:"SignUp"
    })
}
exports.getlogin=(req,res,next)=>{
    
    res.render('login',{
        vError:req.flash('vErr'),
        autherr:req.flash('autherr'),
        isUser:req.session.userId,
        isAdmin:req.session.isAdmin,
        title:"LogIn"
        })
}
exports.postlogin=(req,res,next)=>{
    
    if(vr(req).isEmpty()){
    usermodel.loginCheck(req.body.email,req.body.pass).then((user)=>{
        console.log(user)
        req.session.userId=user._id
        req.session.isAdmin=user.isAdmin
        res.redirect('/')
    }).catch(err=>{
        req.flash('autherr',err)
        console.log(err)
        res.redirect('/login')})
    }else{
        req.flash('vErr',vr(req).array())
        res.redirect('/login')
    }

}
exports.postsignUp=(req,res,next)=>{
    // return console.log(vr(req).array())
    if(vr(req).isEmpty()){
    usermodel.createUser(req.body.username,req.body.email,req.body.password).then(()=>{
        res.redirect('/login')

    }).catch(err=>{
        req.flash('autherr',err)
        res.redirect('/signup')
        })
    }else{
        req.flash('vErr',vr(req).array())
        res.redirect('/signup')
    }
}
exports.logout=(req,res,next)=>{
    req.session.destroy(()=>{
        res.redirect('/')
    })
}