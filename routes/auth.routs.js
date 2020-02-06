const router=require('express').Router()
const bp=require('body-parser')
const check=require('express-validator').check
const authCOntroller=require('../controllers/auth.controller.js')
const authGard=require('./gardes/auth.gard.js')
router.get('/signup',authGard.notAuth,authCOntroller.getsignUp)
router.post('/signup',
bp.urlencoded({extended:true}),
check('username').not().isEmpty().withMessage('username is required')
.isLength({min:6}).withMessage('username must be at least 6 char')
.isLength({max:15}).withMessage('username length must be less than  15 char'),
check('email').not().isEmpty().withMessage('email is required')
.isEmail().withMessage('not valid email'),
check('password').not().isEmpty().withMessage('password is required'),
check('confirmpassword').custom((value,{req})=>{
    if(req.body.password===value)
        return true
    else
        throw "password not match"
})
,authCOntroller.postsignUp)
router.get('/login',authGard.notAuth,authCOntroller.getlogin)
router.post('/login',bp.urlencoded({extended:true}),
check('email').not().isEmpty().withMessage('email is required')
.isEmail().withMessage('not valid email'),
check('pass').not().isEmpty().withMessage('password is required')
,authCOntroller.postlogin)
router.all('/logout',authGard.isAuth,authCOntroller.logout)
module.exports=router
// router.post('/sign up',)