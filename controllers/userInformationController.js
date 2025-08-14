const User = require("../model/authSchema");
const userInformationController = async(req, res) => {
   const user = req.user.userName
   const name = user.split("@")[0];
   res.json({
    message: name
   })
}
module.exports = {
    userInformationController
}