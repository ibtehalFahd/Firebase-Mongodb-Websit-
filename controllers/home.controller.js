var flowerModel=require('../models/home.model.js')
exports.getHome=(req,res,next)=>{

    var category=req.query.category
    var categories=['tulip','Sunflower','Daffodil']
    var id=req.query.fid
    var ids=['1','2','3','4','5','6']

    if(categories.includes(category))
    {
        flowerModel.getFlowersBYcategory(category).then(flowers=>{
        
            res.render('index',{
                flowers:flowers,
                isUser:req.session.userId,
                isAdmin:req.session.isAdmin,
                title:"Home"
            })
        })
    }
    else if(ids.includes(id)){
        var allflower
        flowerModel.getAllFlowers().then(
            flowers=>{
                allflower=flowers
                })
        flowerModel.getFlowersBYId(id).then(flowers=>{
            res.render('index',{
            flowers:allflower,
            detail:flowers,
            isUser:req.session.userId,
            isAdmin:req.session.isAdmin,
            title:"Home"
            })
             })       
    }
    else{
        flowerModel.getAllFlowers().then(flowers=>{
            res.render('index',{
                flowers:flowers,
                detail:{},
                isUser:req.session.userId,
                isAdmin:req.session.isAdmin,
                title:"Home"
            })
        })    
    }
}