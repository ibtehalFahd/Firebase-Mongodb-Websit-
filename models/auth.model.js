const mongoose=require('mongoose')
const bcript=require('bcrypt')
const db_url='mongodb://localhost:27017/mashtal'

const userSchema=mongoose.Schema({
    name:String,
    email:String,
    password:String,
    isAdmin:Boolean
})
const userModel=mongoose.model('user',userSchema)

exports.createUser=(n,e,p)=>{
        
    console.log(n)
    console.log(e)
    console.log(p)
        return new Promise((resolve,reject)=>{
            mongoose
            .connect(db_url,{ useNewUrlParser: true })
            .then(()=>{
                console.log('connected')
                return userModel.find({ email:e})
            }).then(user=>{
                if(user.length!==0){
                    console.log('email is used')
                    mongoose.disconnect()
                    reject('email is used')
                }
                else{
                    console.log('hashed')
                    return bcript.hash(p,10)
                }
            }).then(hashedPass=>{
                let user=new userModel(
                {
                    name:n,
                    email:e,
                    password:hashedPass,
                    isAdmin:true

                })
                console.log(user)
                return user.save()
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
exports.loginCheck=(e,pass)=>{
    console.log(e)
    console.log(pass)
    return new Promise((resolve,reject)=>{
    mongoose.connect(db_url,{useNewUrlParser:true}).then(()=>{
        console.log('connected');
        return userModel.find({email:e})
    }).then(user=>{
        if(user.length===0){
            console.log('email not found');
            mongoose.disconnect()
            reject('email not found')
        }
        else{
            console.log(user[0].password)
            bcript.compare(pass,user[0].password).then(same=>{
                    if(!same){
                        console.log('password is incorrect');
                        mongoose.disconnect()
                        reject('password is incorrect')
                    }
                    else{
                        mongoose.disconnect()
                        resolve(user[0])
                    }
                }
            )
        }
    })
}).catch(err=>{
        console.log('promise error');
        mongoose.disconnect()
        reject(err)
    })

}