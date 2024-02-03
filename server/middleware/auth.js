// middleware 

const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
const authheader = req.headers.authorization;

  if (!authheader)
    return res.status(401).json({ error: "no auth token provided" });

  const token = authheader.split(" ")[1];
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: "unauthorized" });

    console.log(decoded);
    req.user = decoded;
  });
  next();
};

module.exports = { auth};