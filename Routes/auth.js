import express from "express";
const router = express.Router();
import User from "../Models/UsersModel/OrgUser.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

//Register
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    orgId: req.body.orgId,
    email: req.body.email,
    team: req.body.team,
    password:
      req.body.password ?
      CryptoJS.AES.encrypt(
        req.body.password,
        process.env.CRYPTO_KEY
      ).toString() : undefined
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    handleServerError(res, error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const savedUser = await User.findOne({ username: req.body.username });
    if (savedUser) {
      if (
        CryptoJS.AES.decrypt(
          savedUser.password,
          process.env.CRYPTO_KEY
        ).toString(CryptoJS.enc.Utf8) === req.body.password
      ) {
        const accessToken = jwt.sign(
          {
            id: savedUser._id,
            roles: savedUser.Roles,
          },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: "3d",
          }
        );
        const { password, ...others } = savedUser._doc;
        res.status(201).json({ ...others, accessToken });
      } else {
        res.status(401).json("Wrong Credentials");
      }
    } else {
      res.status(401).json("Wrong Credentials");
    }
  } catch (error) {
    res.status(401).json(error);
  }
});

// router.get('/test', async(req, res)=> {
//   try {
//     res.send('hi')
//   } catch (error) {
//     res.status(401).json(error);
//   }
// })

router.post('/examLogin', (req,res)=>{
try {
  
} catch (error) {
  res.status(401).json(error)
}
})
export { router as authRoutes };
