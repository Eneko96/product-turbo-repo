import jwt from 'jsonwebtoken'
import Role from '../models/Role'
import User from '../models/User'

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers['x-access-token']

    if (!token) res.status(403).json({ message: 'no token provided' })

    const decoded = jwt.verify(token, 'secret')
    req.userId = decoded.id

    const user = await User.findById(req.userId, { password: 0 })
    if (!user) res.status(404).json({ message: 'no user found' })

    next()
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized' })
  }
}

export const isModerator = async (req, res, next) => {
  const user = await User.findById(req.userId)
  const roles = await Role.find({ _id: { $in: user.roles } })

  for (let i = 0; i < roles.length; ++i) {
    if (roles[i].name === 'moderator') next()
  }

  res.status(403).json({ message: 'Moderator role required' })
}

export const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.userId)
  const roles = await Role.find({ _id: { $in: user.roles } })

  for (let i = 0; i < roles.length; ++i) {
    if (roles[i].name === 'admin') next()
  }

  res.status(403).json({ message: 'Admin role required' })
}
