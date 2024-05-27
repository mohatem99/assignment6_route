import bcrypt from "bcryptjs";
import User from "../db/models/user.model.js";
import jwt from "jsonwebtoken";

const encryptedPassword = async (password) => {
  return await bcrypt.hash(password, 12);
};

const signToken = (id) => {
  return jwt.sign({ id: id }, "seqluizeorm6", { expiresIn: "1d" });
};

const comparePAsswordInDb = async (requestPassword, passwordInDb) => {
  return await bcrypt.compare(requestPassword, passwordInDb);
};
export const signup = async (req, res, next) => {
  try {
    const { userName, password, email } = req.body;
    const hashedPassword = await encryptedPassword(password);

    const user = await User.create({
      userName,
      email,
      password: hashedPassword,
    });
    const token = signToken(user.id);
    res.status(201).json({
      status: "success",
      data: { user, token },
    });
  } catch (err) {
    res.status(400).json({ status: "failed", message: err.message });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(
        res.status(400).json({
          status: "failed",
          message: "Please enter invalid email & password for login in !",
        })
      );
    }
    const user = await User.findOne({ where: { email: email } });

    if (!user || !(await comparePAsswordInDb(password, user.password))) {
      return next(
        res.status(400).json({
          status: "failed",
          message: "Incorrect Email or Password !",
        })
      );
    }

    const token = signToken(user.id);
    res.status(200).json({
      status: "success",
      data: {
        user,
        token,
      },
    });
  } catch (err) {
    res.status(400).json({ status: "failed", message: err.message });
  }
};
export const allUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).json({
      status: "success",
      data: users,
    });
  } catch (err) {
    res.status(400).json({ status: "failed", message: err.message });
  }
};

export const protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      console.log(token);
    }
    if (!token) {
      return next(
        res.status(401).json({
          status: "failed",
          message: "You are not logged in !",
        })
      );
    }
    const decodedToken = await jwt.verify(token, "seqluizeorm6");
    console.log(decodedToken);
    const user = await User.findByPk(decodedToken.id);
    console.log(token);
    console.log(user);
    if (!user) {
      return next(
        res.status(401).json({
          status: "failed",
          message: "this user with given token doesnt exist !",
        })
      );
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).json({ status: "failed", message: err.message });
  }
};

export const logOut = async (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "log out successfully !",
  });
};
