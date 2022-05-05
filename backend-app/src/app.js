import express from 'express'
import morgan from 'morgan'
import pkg from '../../package.json'
import productsRoutes from './routes/products.routes'
import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'
import { createRoles } from './libs/initialSetup'
require('dotenv').config()

const app = express()
createRoles()
app.set('pkg', pkg) // adding package.json on express state
app.use(morgan('dev')) // just for telling info on console (dev environment)
app.use(express.json()) // in order to understand json body

app.get('/', (_req, res) => {
  res.json({
    author: app.get('pkg').author,
    description: app.get('pkg').description,
    version: app.get('pkg').version
  })
})

app.use('/api/products', productsRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)

export default app
