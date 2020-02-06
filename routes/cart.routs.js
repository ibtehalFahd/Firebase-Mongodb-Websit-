const router=require('express').Router()
const bp=require('body-parser')
const cartCOntroller=require('../controllers/cart.controller.js')
const authGard=require('./gardes/auth.gard.js')
router.get('/',authGard.isAuth,cartCOntroller.getCart)
router.post('/',authGard.isAuth,bp.urlencoded({extended:true}),cartCOntroller.postCart)
module.exports=router