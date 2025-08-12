const { authZodSchema } = require("../validations/auth")
const userAuth = require("../model/authSchema");

const authController = async (req, res) =>{
   const inputData = {
    userName: req.body.userName,
    password: req.body.password
   }

   try{
    const parsedData = authZodSchema.safeParse(inputData);

    if(parsedData.success){
        await userAuth.create({
            userName: userName,
            password: password
        })
    }
    console.log("User Created successfully");
    res.json({
        message: "signup successfull"
    })
   }
   catch(err){
    console.error(err.errors);
   }
} 

module.exports = { 
    authController
}