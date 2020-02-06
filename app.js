const express=require('express')
const path=require('path')
const flash=require('connect-flash')
const session=require('express-session')
const sessionStore=require('connect-mongodb-session')(session)
const STORE= new sessionStore({
    uri:'mongodb://localhost:27017/mashtal',
    collection:'sessions'

})


var hr=require('./routes/home.routs')
var pr=require('./routes/product.routs')
var ar=require('./routes/auth.routs')
var cr=require('./routes/cart.routs')
var adminr=require('./routes/admin.routs')

const app=express()

app.set('view engine','ejs')
app.set('views','views')

const staticFiles=express.static(path.join(__dirname,'assests'))
const staticImg=express.static(path.join(__dirname,'images'))

app.use(staticFiles,staticImg)
app.use(session({
    secret:'This is my comlex string to hash sission',
    saveUninitialized:false,
    resave:true,
    store:STORE
}))
app.use(flash())
app.use('/',hr)
app.use('/',ar)
app.use('/cart',cr)
app.use('/product',pr)
app.use('/admin',adminr)


app.listen(4000,()=>console.log('welcome to online flower shop'))