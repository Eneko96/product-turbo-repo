import { Router } from 'express'
import * as productController from '../controllers/products.controller'
const router = Router()

router.get('/', productController.getProducts)
router.post('/', productController.createProduct)
router.delete('/:productId', productController.deleteProductById)
router.put('/:productId', productController.updateProductById)
export default router
