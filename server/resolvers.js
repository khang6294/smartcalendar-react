const bcrypt = require('bcryptjs');
const User = require('./models/userModel') 
const Work = require('./models/workModel')

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
    createWork: async function({workInput},req) {
        const work = new Work({
            dateWork: workInput.dateWork,
            toDo: workInput.toDo,
            creator: "5c24ac21d56564235cfe8ab4"
          });
          const createdWork = await work.save();
          return {
            ...createdWork._doc,
            _id: createdWork._id.toString(),
          };
    },
    works: async function({creator},req){
        if(!creator){
            creator = "5c24ac21d56564235cfe8ab4"
        }
        const works = await Work.find()
        console.log(works)
        return works.filter(work => work.creator.toString() === creator).map(work => {
                return {
                    ...work._doc,
                    _id: work._id.toString(),
                };
            })

    },
    work: async function({dateWork},req){
        const work = await Work.findOne({dateWork:dateWork})
        return {
            ...work._doc,
            _id:work._id.toString()
        }
    },
    hello: () => {
        return "Hello"
    }
}