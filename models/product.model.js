const mongoose=require('mongoose')
const db_url='mongodb://localhost:27017/mashtal'


exports.getFlowersBYId=(productId)=>{

    return new Promise((resolve,reject)=>{
        mongoose.connect(db_url,{ useNewUrlParser: true }).then(()=>{
            return flowerModel.findOne({productId:productId})
        }).then(flowers=>{
            mongoose.disconnect()
            resolve(flowers)
            console.log(flowers)
    
        }).catch(err=>reject(err))
    })
    }