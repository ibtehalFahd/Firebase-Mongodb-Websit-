const mongoose=require('mongoose')
const db_url='mongodb://localhost:27017/mashtal'
const cartSchema=mongoose.Schema({
    produtId:Number,
    name:String,
    price:Number,
    amount:Number,
    userId:String,
    timeStamp:Date
})
const cartModel=mongoose.model('cart',cartSchema)
exports.getItemByUserId=(userId)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(db_url,{ useNewUrlParser: true }).then(()=>{
            return cartModel.find({userId:userId},{},{sort:{timeStamp:1}})
        }).then(items=>{
            mongoose.disconnect()
            resolve(items)
            // console.log(items)
    
        }).catch(err=>{
            mongoose.disconnect()
            reject(err)
        })
    })
    }
exports.addToCart=(id,n,p,a,uid,date)=>{
    // console.log(id)
    // console.log(n)
    // console.log(p)
    // console.log(a)
    // console.log(uid)
    // console.log(date)
    return new Promise((resolve,reject)=>{
        mongoose.connect(db_url,{useNewUrlParser:true}).then(()=>{
            console.log('connected')
            let cart=new cartModel({
                produtId:id,
                name:n,
                price:p,
                amount:a,
                userId:uid,
                timeStamp:date
            })
            return cart.save()
        }).then(()=>{
            console.log('resolve')
            mongoose.disconnect()
            resolve()
        })

    }).catch(err=>{
        console.log(err)
        mongoose.disconnect()
        reject(err)
    })
}