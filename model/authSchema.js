// const mongoose = require("mongoose");
// const argon2 = require("argon2");

// const urlSchema = new mongoose.Schema({
//   originalUrl: { type: String, required: true },
//   shorturl: { type: String, required: true, unique: true },
//   clicks: { type: Number, default: 0 },
//   createdAt: { type: Date, default: Date.now },
// }, { _id: false });

// const authSchema = new mongoose.Schema(
//   {
//     userName: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       // sparse: true,
//       trim: true,
//       lowercase: true,
//     },
//     passwordResetToken : String,
//     passwordResetExpires: Date,
//     tokenVersion:{
//       type: Number,
//       default: 0

//     },
//     role:{
//       type: String,
//       enum: ['user', 'admin'],
//       default: 'user'
//     },
//     isActive:{
//       type: Boolean,
//       default: true
//     },
//     lastLogin: Date,

//     urls: [urlSchema]
//   },
//   { timestamps: true }
// );

// // Auto-generate userName from email if not set
// authSchema.pre("save", function (next) {
//   if (!this.userName && this.email) {
//     this.userName = this.email.split("@")[0];
//   }
//   next();
// });

// // Hash password with Argon2
// authSchema.pre("save", async function (next) {
//   if (this.isModified("password")) {
//     try {
//       this.password = await argon2.hash(this.password, {
//         type: argon2.argon2id,
//         memoryCost: 2 ** 16, // 64 MB
//         timeCost: 3,
//         parallelism: 1,
//       });
//     } catch (err) {
//       return next(err);
//     }
//   }
//   next();
// });

// // Instance method to verify password
// authSchema.methods.verifyPassword = async function (candidate) {
//   try {
//     return await argon2.verify(this.password, candidate);
//   } catch (err) {
//     return false;
//   }
// };

// const Auth = mongoose.model("Auth", authSchema);
// module.exports = Auth;
