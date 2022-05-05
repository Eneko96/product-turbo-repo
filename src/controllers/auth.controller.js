import User from '../models/User'
import jwt from 'jsonwebtoken'
import Role from '../models/Role'

export const signUp = async (req, res) => {
  const { username, email, password, roles } = req.body

  const newUser = new User({
    username,
    email,
    password: await User.encryptPassword(password)
  })

  if (roles) {
    const foundRoles = await Role.find({ name: { $in: roles } }) // de todos los roles que tengo en usuarios, lo busco en la bd
    newUser.roles = foundRoles.map(role => role._id) // will save just the ObjectId
  } else {
    const role = await Role.find({ name: 'user' })
    newUser.roles = [role._id]
  }

  const saveUser = await newUser.save()

  const token = jwt.sign({ id: saveUser._id }, 'secret', {
    expiresIn: 86400 // 24h
  })

  res.status(200).json({ token })
}

export const signIn = async (req, res) => {
  const userFound = await User.findOne({ email: req.body.email }).populate('roles')
  if (!userFound) res.status(400).json({ message: 'user not found' })

  const matchPassword = await User.comparePassword(req.body.password, userFound.password)

  if (!matchPassword) res.status(401).json({ token: null, message: 'invalid password' })

  const token = jwt.sign({ id: userFound._id }, 'secret', {
    expiresIn: 86400
  })
  res.json({ token })
}
