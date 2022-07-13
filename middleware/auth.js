const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Not authorized...");

  try {
    const secretKey = process.env.SECRET_KEY;
    const payload = jwt.verify(token, secretKey);
    req.user = payload;
    next();
  } catch (error) {
    res.status(400).send("Invalid token...");
  }
}

const authAdmin = (req, res, next) => {
  auth(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not authorized as the admin...");
    }
  });
};

module.exports = {
  auth,
  authAdmin,
};
