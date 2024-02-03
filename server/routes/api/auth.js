const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

const MAX_LOGIN_ATTEMPTS = 3; // Define the maximum allowed login attempts
const LOCK_TIME = 5 * 60 * 1000;

router.post('/register',(req,res,next)=>{
  User.findOne({name:req.body.name})
  .then(user=>{
      if(user) return res.status(400)
      .json({error:"user already registered"})

      bcrypt.hash(req.body.password,10,(err,hash)=>{
          if(err){
              return res.status(500).json({error:err.message})
          }
          else{
              const user = {
                  name:req.body.name,
                  email:req.body.email,
                  password:hash
              }
              User.create(user)
              .then((user)=>{+
                  res.status(200).json(user)
              })
              .catch(next)
          }
      })
  }).catch(next);
})

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return handleFailedLogin(user);
    }

    // Check if the account is locked
    if (await isAccountLocked(user)) {
      return res.status(401).json({ error: "Account locked. Try again later." });
    }

    bcrypt.compare(password, user.password, async (err, result) => {
      if (err) {
        return res.status(401).json({ error: err.message });
      }

      if (!result) {
        // Increment login attempts on failed login
        await handleFailedLogin(user);
        return res.status(401).json({ error: "Invalid username or password" });
      }

      // Reset login attempts on successful login
      await resetLoginAttempts(user);

      const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
      };

      jwt.sign(payload, process.env.SECRET, (err, token) => {
        if (err) {
          return res.status(401).json({ error: "Secret chaina" });
        }

        res.status(200).json({ email: user.email, token });
      });
    });
  } catch (error) {
    next(error);
  }
});

async function handleFailedLogin(user) {
  user.loginAttempts += 1;
  if (user.loginAttempts >= MAX_LOGIN_ATTEMPTS) {
    user.lockedUntil = new Date(Date.now() + LOCK_TIME);
    console.log("Account locked until: ", user.lockedUntil);

  }
  await user.save();
}

async function resetLoginAttempts(user) {
  user.loginAttempts = 0;
  user.lockedUntil = null;
  await user.save();
}

async function isAccountLocked(user) {
  return user.lockedUntil && user.lockedUntil > new Date();
}

module.exports = router;
