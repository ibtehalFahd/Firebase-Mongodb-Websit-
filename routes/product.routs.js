const router=require('express').Router()
const homeController=require('../controllers/product.controller.js')

router.get('/:id',homeController.getproduct)
module.exports=router

