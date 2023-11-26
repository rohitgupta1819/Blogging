import User from '../model/User';
import bcrypt from 'bcryptjs';

export const signup = async (req, res, next) => {
    const { name, email, password } = req.body;

    let exectinguser;
    try {
        exectinguser = await User.findOne({ email });
    } catch (err) {
        return console.log(err);
    }

    if (exectinguser) {
        return res.status(400).json({ message: "User already exist, please login" });
    }

    const hashPassword = bcrypt.hashSync(password);

    const user = new User({
        name,
        email,
        password: hashPassword,
        blogs: []
    });

    try {
        user.save();
    } catch (err) {
        return console.error(err);
    }

    return res.status(201).json({ user });
}


export const login = async (req, res, next)=>{
    const {email,password} = req.body;

    let exectinguser;

    try{
        exectinguser = await User.findOne({email});
    } catch(err){
        return console.log(err);
    }

    if(!exectinguser){
        return res.status(400).json({message:"No User Found!"});
    }

    const isPassCorrect = bcrypt.compareSync(password, exectinguser.password);

    if(!isPassCorrect){
        return res.status(400).json({message:"Incorrect password"});
    }

    return res.status(200).json({message:"Logged In", user:exectinguser});
}

export const getAllUser = async (req, res, next)=>{
    let users;

    try{
       users = await User.find();
    }
    catch(err){
       console.log(err);
    }

    if(!users){
       return res.status(400).json({message:"No User Found"});

    }
    return res.status(200).json({users});
}