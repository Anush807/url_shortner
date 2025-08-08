const { PrismaClient } = require( "../generated/prisma/index");
const prisma = new PrismaClient(); 

const authController = async (req, res) =>{
    const { id, username, email  } = req.body;
    const existingUser = await prisma.user.findUnique({clerkid: id});
    if(!existingUser){
        const newUser = await prisma.user.create({
            clerkid: id,
            username: username,
            email: email,

        })
        res.json({
            "user created successfully": newUser
        })
    }
} 

module.exports = { 
    authController
}