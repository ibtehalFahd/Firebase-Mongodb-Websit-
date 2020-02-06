var cartModel=require('../models/cart.model.js')

exports.postCart=(req,res,next)=>{
    cartModel.addToCart(req.body.id,req.body.name,req.body.pirce,1,req.session.userId,Date.now()).then(()=>{
        res.redirect('/cart')
    })

}
exports.getCart=(req,res,next)=>{
    cartModel.getItemByUserId(req.session.userId).then((items)=>{
        // console.log(items)
        res.render('cart',{
            items:items,
            isUser:req.session.userId,
            isAdmin:req.session.isAdmin,
            title:"Cart"
        })
    })

}