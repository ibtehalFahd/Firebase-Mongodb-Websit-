var adminmodel=require('../models/home.model.js')

const vr=require('express-validator').validationResult

exports.getadd=(req,res,next)=>{
    
    res.render('addProduct',{
    vError:req.flash('vErr'),
    aderr:req.flash('aderr'),
    isUser:req.session.userId,
    isAdmin:req.session.isAdmin,
    title:"addProduct"
    })
}
exports.postadd=(req,res,next)=>{
    // return console.log(vr(req).array())
    if(vr(req).isEmpty()){
        adminmodel.addflower(req.body.cat,req.body.price,req.body.disc,req.file.filename,req.body.name).then(()=>{
        res.redirect('/admin/addProduct')

    }).catch(err=>{
        console.log('here2')
        req.flash('aderr',err)
        res.redirect('/admin/addProduct')
        })
    }else{
        console.log(vr(req).array())
        req.flash('vErr',vr(req).array())
        res.redirect('/admin/addProduct')
    }
    // console.log(vr(req).array())
}
