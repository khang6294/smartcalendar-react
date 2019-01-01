const bcrypt = require('bcryptjs');
const User = require('./models/userModel') 
const Work = require('./models/workModel')
const jwt = require('jsonwebtoken');


module.exports = {
    createUser: async function({userInput},req) {
        const existingUser = await User.findOne({ email: userInput.email });
        if (existingUser) {
            const error = new Error('User exists!');
            error.code = 409;
            throw error;
        }
        const hashedPw = await bcrypt.hash(userInput.password,12)
        const user = new User({
            name: userInput.name,
            email: userInput.email,
            password: hashedPw
        }) 
        const createdUser = await user.save();
        return { ...createdUser._doc, _id: createdUser._id.toString() };
    },
    login: async function({ email, password },req) {
        const user = await User.findOne({ email: email });
        if (!user) {
            const error = new Error('User not found.');
            error.code = 401;
            throw error;
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            const error = new Error('Password is incorrect.');
            error.code = 401;
            throw error;
        }
        const token = jwt.sign(
        {
            userId: user._id.toString(),
            email: user.email
        },
            'smartcalendarsuperdupersecrettokenbykennguyen',
            { expiresIn: '1h' }
        );
        return { token: token, userId: user._id.toString() };
    },
    createWork: async function({workInput},req) {
        const work = new Work({
            dateWork: workInput.dateWork,
            toDoList: workInput.toDoList,
            creator: req.userId.toString()
          });
          const createdWork = await work.save();
          return {
            ...createdWork._doc,
            _id: createdWork._id.toString(),
          };
    },
    works: async function({creator},req){
        if(!creator){
            creator = req.userId.toString()
        }
        const works = await Work.find()
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
    updateWork: async function({ dateWork, workInput }, req) {
        const work = await Work.findOne({dateWork:dateWork}) 
        work.dateWork = dateWork       
        work.toDoList = workInput.toDoList;
        const updatedWork = await work.save();
        return {
          ...updatedWork._doc,
          _id: updatedWork._id.toString(),
        };
    },
}