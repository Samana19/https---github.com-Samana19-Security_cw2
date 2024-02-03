const express = require("express");
const router = express.Router();
require("dotenv").config();
const { auth } = require("../../middleware/auth");

const User = require("../../models/User");

// Get all users
router.get("/all", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
    console.log(req.body);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//uolpad a user image
// router.post("/upload", auth, async (req, res) => {
//   try {
//     const { id } = req.user;
//     const { avatar } = req.body;

//     let user = await User.findById(id);
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Check if the logged-in user ID matches the user ID being updated
//     if (req.user.id !== user.id) {
//       return res.status(401).json({ error: "Unauthorized" });
//     }
    
//     user.avatar = avatar;

//     await user.save();

//     res.status(200).json(user);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

// Get a user
router.get("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user.id !== id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    let user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//patch a logged in user
router.patch("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, avatar } = req.body;

    let user = await User.findByIdAndUpdate(
      id,
      { name, email, avatar },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the logged-in user ID matches the user ID being updated
    if (req.user.id !== user.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    await user.save();

    res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Update a user
router.patch('/:id', auth, async (req, res,next) => {
  const { id } = req.params;
  const { name, email, avatar } = req.body;

  try {
    //find the user
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the logged-in user ID matches the user ID being updated
    if (req.user.id !== user.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    //update the user if provided in the request body
    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }
    if (avatar) {
      user.avatar = avatar;
    }

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
});
//   try {
//     const { id } = req.params;
//     const { name, email, avatar } = req.body;

//     let user = await User.findById(id);
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     // Check if the logged-in user ID matches the user ID being updated
//     if (req.user.id !== user.id) {
//       return res.status(401).json({ error: 'Unauthorized' });
//     }

//     user.name = name;
//     user.email = email;
//     user.avatar = avatar;

//     await user.save();

//    res.status(200).json(user);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

// Delete a user
// router.delete("/:id", auth, async (req, res) => {
//   try {
//     const { id } = req.params;

//     let user = await User.findById(id);
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Check if the logged-in user ID matches the user ID being deleted
//     if (req.user.id.toString() !== user.id.toString()) {
//       return res.status(401).json({ error: "Unauthorized" });
//     }

//     await user.deleteOne();

//     res.status(200).json({ msg: "User deleted" });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

module.exports = router;
