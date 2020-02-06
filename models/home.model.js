const mongoose=require('mongoose')
const db_url='mongodb://localhost:27017/mashtal'
var flowerSchema=mongoose.Schema({
    category:String,
    price:Number,
    discription:String,
    photo:String,
    name:String,
})
var flowerModel=mongoose.model('flower',flowerSchema)

exports.addflower=(cat,price,disc,photo,name)=>{
    return new Promise((resolve,reject)=>{
         mongoose
        .connect(db_url,{ useNewUrlParser: true })
        .then(()=>{
            let flower=new flowerModel(
            {
                category :cat,
                price : price,
                discription :disc,
                photo : photo,
                name : name,
            })
            console.log(flower)
            return flower.save()
        }).then(()=>{
            console.log('resolve')
            mongoose.disconnect()
                resolve()
        }).catch(err=>{
            console.log('reject')
            reject(err)
            mongoose.disconnect()
        })

    })

}
exports.getAllFlowers=()=>{

return new Promise((resolve,reject)=>{
    mongoose.connect(db_url,{ useNewUrlParser: true }).then(()=>{
        return flowerModel.find({})
    }).then(flowers=>{
        mongoose.disconnect()
        resolve(flowers)
       // console.log(flowers)

    }).catch(err=>reject(err))
})
}
exports.getFlowersBYcategory=(category)=>{

    return new Promise((resolve,reject)=>{
        mongoose.connect(db_url,{ useNewUrlParser: true }).then(()=>{
            return flowerModel.find({category:category})
        }).then(flowers=>{
            mongoose.disconnect()
            resolve(flowers)
           // console.log(flowers)
    
        }).catch(err=>reject(err))
    })
    }
    exports.getFlowersBYId=(flowerId)=>{

        return new Promise((resolve,reject)=>{
            mongoose.connect(db_url,{ useNewUrlParser: true }).then(()=>{
                return flowerModel.findOne({flowerId:flowerId})
            }).then(flowers=>{
                mongoose.disconnect()
                resolve(flowers)
                //console.log(flowers)
        
            }).catch(err=>reject(err))
        })
}