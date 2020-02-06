const mongoose=require('mongoose')
const db_url='mongodb://localhost:27017/mashtal'
const productSchema=mongoose.Schema({
        category :String,
        price : Number,
        discription :String,
        photo : String,
        name : String,
})

const productModel=mongoose.model('flower',productSchema)

exports.addProduct=(cat,price,disc,photo,name)=>{
    return new Promise((resolve,reject)=>{
         mongoose
        .connect(db_url,{ useNewUrlParser: true })
        .then(()=>{
            let product=new productModel(
            {
                category :cat,
                price : price,
                discription :disc,
                photo : photo,
                name : name,
            })
            console.log(product)
            return product.save()
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