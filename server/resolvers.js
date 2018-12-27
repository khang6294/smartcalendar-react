const bcrypt = require('bcryptjs');
const User = require('./models/userModel') 


module.exports = {
    createUser: async function({userInput},req) {
        const hashedPw = await bcrypt.hash(userInput.password,12)
        const user = new User({
            name: userInput.name,
            email: userInput.email,
            password: hashedPw
        }) 
        const createdUser = await user.save();
        return { ...createdUser._doc, _id: createdUser._id.toString() };
    },
    hello: () => {
        return "Hello"
    }
}