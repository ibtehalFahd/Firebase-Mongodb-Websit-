var productModel=require('../models/home.model.js')

exports.getproduct=(req,res,next)=>{
    let id=req.params.id
    console.log(id)
    productModel.getFlowersBYId(id).then(flowers=>{
        res.render('product',{
            flowers:flowers,
            isUser:req.session.userId,
            isAdmin:req.session.isAdmin,
            title:"Product"
        })
    })
}