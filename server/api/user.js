const fs = require("fs");
const path = require("path");
const dbPath = path.resolve(__dirname, "../../assets/db.json");
const Router = require("express").Router();

const { responseError, responseSuccess } = require("../helpers/userHelper");

const getUser = async (req, res) => {
  try {
    fs.readFile(dbPath, (error, data) => {
      if (error) {
        console.log(error);
        return responseError(res, 400, "Cannot get user");
      }
      const user = JSON.parse(data);
      return responseSuccess(res, 200, "Success get user", user);
    });
  } catch (error) {
    console.log(error);
    return responseError(res, 400, "Cannot get user");
  }
};

const addUser = async (req, res) => {
  try {
    const rawData = fs.readFileSync(dbPath);
    const data = JSON.parse(rawData);

    var id = data.users.length;

    const userData = {
      id,
      email: req.body.email,
      password: req.body.password,
    };

    data.users.push(userData);

    fs.writeFileSync(dbPath, JSON.stringify(data));

    return responseSuccess(res, 200, "Success post user");
  } catch (error) {
    console.log(error);
    return responseError(res, 400, "Cannot post user");
  }
};

const updateUser = async (req, res) => {
  try {
    const rawData = fs.readFileSync(dbPath);
    const data = JSON.parse(rawData);
    const idParam = parseInt(req.params["id"]);

    const userIndex = data.users.findIndex((data) => data.id === idParam);

    if (userIndex === -1) {
      return responseError(res, 404, "User not found");
    }

    const { email, password } = req.body;
    userUpdate = { ...userUpdate, email, password };

    fs.writeFileSync(dbPath, JSON.stringify(data));

    return responseSuccess(res, 200, "Success delete user", userUpdate);
  } catch (error) {
    console.log(error);
    return responseError(res, 400, "Cannot delete user");
  }
};

const deleteUser = async (req, res) => {
  try {
    const rawData = fs.readFileSync(dbPath);
    const data = JSON.parse(rawData);
    const idParam = parseInt(req.params["id"]);

    const userIndex = data.users.findIndex((data) => data.id === idParam);

    if (userIndex === -1) {
      return responseError(res, 404, "User not found");
    }

    data.users.splice(userIndex, 1);

    fs.writeFileSync(dbPath, JSON.stringify(data));

    return responseSuccess(res, 200, "Success update user");
  } catch (error) {
    console.log(error);
    return responseError(res, 400, "Cannot update user");
  }
};

const getUserById = async (req, res) => {
  try {
    const rawData = fs.readFileSync(dbPath);
    const data = JSON.parse(rawData);
    const idParam = parseInt(req.params.id);

    const user = data.users.find((data) => data.id === idParam);

    if (!user) {
      return responseError(res, 404, "User not found");
    }

    return responseSuccess(res, 200, "Success get user by ID", user);
  } catch (error) {
    console.log(error);
    return responseError(res, 400, "Cannot get user by ID");
  }
};

Router.get("/", getUser);
Router.get("/:id", getUserById);
Router.post("/", addUser);
Router.put("/:id", updateUser);
Router.delete("/:id", deleteUser);

module.exports = Router;
