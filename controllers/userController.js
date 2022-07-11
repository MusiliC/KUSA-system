const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validateUser } = require("../helpers/userValidator");
const { validUser } = require("../helpers/signValidator");
const { User } = require("../models/userModel");

// async function getUsers(req, res) {
//   try {
//   } catch (error) {}
// }

//register user

async function createUser(req, res) {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    //check if user exists
    let user = await User.findOne({ email: req.body.email });
    if (user) res.status(400).send("User with that email already exist..");

    const { name, email, number, password } = req.body;

    user = new User({
      name,
      email,
      number,
      password,
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    //generating a token

    const secretKey = process.env.SECRET_KEY;

    const token = jwt.sign(
      { _id: user._id, name: user.name, email: user.email },
      secretKey
    );

    //   return success response
    res.status(200).send({
      message: "Registration Successful",
      id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
}

//sign user

async function signUser(req, res) {
  const { error } = validUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    //check if user exists

    let user = await User.findOne({ email: req.body.email });
    if (!user) res.status(400).send("invalid email or password ..");

    //compare password

    const validUser = await bcrypt.compare(req.body.password, user.password);

    if (!validUser) return res.status(400).send("Invalid email or password..");

    //generating a token

    const secretKey = process.env.SECRET_KEY;

    const token = jwt.sign(
      { _id: user._id, name: user.name, email: user.email },
      secretKey
    );

    //   return success response
    res.status(200).send({
      message: "Login Successful",
      id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
}

module.exports = {
  createUser,
  signUser,
};
