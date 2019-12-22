const db = require("./db");
const User = require("../models/User");

const createUser = () => {
  User.create({
    name: "John Doe",
    email: "johndoe@test.com",
    admin: true,
    password: "johndoe2000"
  })
    .then(res => console.log(res))
    .catch(err => console.log(err));
  console.log("CREATED USER USER USER");
};

module.exports = createUser;
