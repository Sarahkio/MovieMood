const bcrypt = require("bcryptjs");
let password = "password";

const hash = async () => {
  let hashPassword = await bcrypt.hash(password, 10);
  console.log(hashPassword);
};

hash();
