import { getUser, saveUser } from "../service/users.service.js";
import { createHash, generateToken, isValidPassword } from "../utils.js";

const register = async (req, res) => {
  try {
    const { first_name, last_name, role, email, password } = req.body;

    if (!first_name || !last_name || !role || !email || !password) {
      return res.sendClientError("incomplete values");
    }

    const existsUser = await getUser(email);

    if (existsUser) {
      return res.sendClientError("user already exists");
    }

    const hashedPassword = createHash(password);

    const newUser = {
      ...req.body,
    };

    console.log(newUser);

    newUser.password = hashedPassword;

    const result = await saveUser(newUser);

    res.sendSucessNewResource(result);
  } catch (error) {
    res.sendServerError(error.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.sendClientError("incomplete values");
    }

    const user = await getUser(email);

    if (!user) {
      return res.sendClientError("incorrect credentials");
    }

    const comparePassword = isValidPassword(password, user.password);

    if (!comparePassword) {
      return res.sendClientError("incorrect credentials");
    }

    const accessToken = generateToken(user);

    res.sendSuccess(accessToken);
  } catch (error) {
    res.sendServerError(error.message);
  }
};

const githubCallback = async (req, res) => {
  req.user = {
    first_name: `${req.user.first_name} ${req.user.last_name}`,
    email: req.user.email,
    age: req.user.age,
    role: req.user.role,
  };

  const accessToken = generateToken(req.user);

  res.sendSuccess(accessToken);
  res.redirect("/");
};

const logout = async (req, res) => {
  req.user.destroy((error) => {
    if (error)
      return res.status(500).send({ status: "error", message: error.message });
    res.redirect("/");
  });
};

export { register, login, githubCallback, logout };
