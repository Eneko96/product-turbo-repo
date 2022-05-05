
import { ROLES } from '../models/Role'
import User from '../models/User'
export const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).json({ message: `Role ${req.body.roles[i]} does not exist` })
      }
    }
  }
  next()
}

export const checkDuplicateUserOrEmail = async (req, res, next) => {
  const user = await User.findOne(req.body.username)

  if (user) res.status(400).json({ message: 'The user already exists' })

  const email = await User.findOne(req.body.email)
  if (email) res.status(400).json({ message: 'The email already exists' })

  next()
}
