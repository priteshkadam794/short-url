//   stateful authentication : Here we maintain the state in the server by storing the record of the users logged in in some sort of data structure like a map.
// const UsersRegistry = new Map();

// function setUser(id, user) {
//   UsersRegistry.set(id, user);
// }

// function getUser(id) {
//   return UsersRegistry.get(id);
// }

// stateless authentication : Here we dont maintain the state of the app in the server but the state is maintained in the local browser or app. It is a recommended method .

const jwt = require("jsonwebtoken");
const secretKey = "";
function setUser(user) {
  return jwt.sign(
    {
      _id: user.id,
      email: user.email,
    },
    secretKey
  );
}

function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, secretKey);
  } catch (e) {
    return null;
  }
}
module.exports = {
  setUser,
  getUser,
};
