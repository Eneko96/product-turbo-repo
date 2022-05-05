import { Router } from 'express'
import * as authController from '../controllers/auth.controller'
import { verifySignup } from '../middlewares'
const router = Router()

router.post('/signin', [verifySignup.checkDuplicateUserOrEmail, verifySignup.checkRolesExisted], authController.signIn)

router.post('/signup', authController.signUp)

export default router
