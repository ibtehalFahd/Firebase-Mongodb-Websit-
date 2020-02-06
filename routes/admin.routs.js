const router=require('express').Router()
const bp=require('body-parser')
const multer=require('multer')
const check=require('express-validator').check
const adminCOntroller=require('../controllers/admin.controller.js')
const adminGard=require('./gardes/admin.gard.js')
router.get('/addProduct',adminGard.isadmin,adminCOntroller.getadd)
router.post('/addProduct',
bp.urlencoded({extended:true}),
multer({
    storage:multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,'images');
        },
        filename:(req,file,cb)=>{
            cb(null,Date.now()+'-'+file.originalname)
        }
    })
}).single('img'),check('img').custom((value,{req})=>{
    if(req.file)  return true
    else throw 'image is required'
}),check('cat').not().isEmpty().withMessage('category is required'),
check('price').not().isEmpty().withMessage('price is required'),
check('name').not().isEmpty().withMessage('name is required')
.isLength({min:6}).withMessage('name must be at least 6 char')
.isLength({max:30}).withMessage('name length must be less than  15 char'),
check('disc').not().isEmpty().withMessage('discription is required'),adminCOntroller.postadd
)
module.exports=router