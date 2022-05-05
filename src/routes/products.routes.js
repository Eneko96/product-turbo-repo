import { Router } from 'express'
import * as productController from '../controllers/products.controller'
import { authJwt } from '../middlewares'
const router = Router()

router.get('/', productController.getProducts)
router.post('/', [authJwt.verifyToken, authJwt.isModerator], productController.createProduct)
router.delete('/:productId', authJwt.verifyToken, productController.deleteProductById)
router.put('/:productId', [authJwt.verifyToken, authJwt.isModerator], productController.updateProductById)
export default router
