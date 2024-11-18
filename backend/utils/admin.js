const User = require('../models/User')

const createAdminAccount = async () =>{
    try {
        const existingAdmin = await User.find({email: process.env.ADMIN_EMAIL})
        //await User.deleteOne({email: process.env.ADMIN_EMAIL})
        if(!existingAdmin.length) {
            await User.create({
                name: 'admin',
                email: process.env.ADMIN_EMAIL,
                password: process.env.ADMIN_PASSWORD,
                role: 'admin',
            })
            return console.log('admin created')
        }
        return console.log('admin already exist')
    } catch (error) {
        console.error(error.message)
    }
}

module.exports = {createAdminAccount}