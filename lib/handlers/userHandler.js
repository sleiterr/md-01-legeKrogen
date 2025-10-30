const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//! The createUser() function does the following:
// 1. Receives the new user's data.
// 2. Checks if a user with the same email already exists.
// 3. If not, hashes the password for security.
// 4. Creates a new user record in the MongoDB database.
// 5. Returns the newly created user.

const createUser = async ({ name, email, role, password, image }) => {
  try {
    const existing = await User.findOne({ email }); // existing user
    if (existing) return { status: "error", message: "Email findes allerede" }; // if existing return message: (Email findes allerede)

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      role,
      hashedPassword,
      picture: image,
    });

    return { status: "ok", user: newUser };
  } catch (err) {
    return { status: "error", message: err.message };
  }
};

//! The updateUser() function performs the following:
// 1. Receives the user's ID and the fields to be updated.
// 2. Finds the user in the database by ID.
// 3. If the user doesn't exist, returns an error.
// 4. If found, updates the provided fields and saves the changes.
// 5. Returns the updated user object.

const updateUser = async (data) => {
  try {
    const { id, ...fields } = data;

    const user = await User.findById(id);
    if (!user) return { status: "not_found", message: "Bruger ikke fundet" };

    Object.assign(user, fields);
    await user.save();
    return { status: "ok", user };
  } catch (err) {
    return { status: "error", message: err.message };
  }
};

//! The deleteUser() function does the following:
// 1. Finds the user in the database by ID.
// 2. If the user doesn't exist, returns a "not found" error.
// 3. If found, removes the user from the database using user.remove().
//    ⚠️ Note: user.remove() is deprecated in newer versions of Mongoose.
//    It’s recommended to use `await User.findByIdAndDelete(id)` instead.
// 4. Returns a success message after deletion.

const deleteUser = async (id) => {
  try {
    const user = await User.findById(id);
    if (!user) return { status: "not_found", message: "Bruger ikke fundet" };
    await user.remove();
    return { status: "ok", message: "Bruger slettet" };
  } catch (err) {
    return { status: "error", message: err.message };
  }
};

//! The getUserById() function does the following:
// 1. Receives a user ID as input.
// 2. Searches the database for a user with that ID.
// 3. If the user is not found, returns a "not found" error.
// 4. If the user is found, returns the user object.
// 5. Handles any errors that may occur during the database query.

const getUserById = async (id) => {
  try {
    const user = await User.findById(id);
    if (!user) return { status: "not_found", message: "Bruger ikke fundet" };
    return { status: "ok", user };
  } catch (err) {
    return { status: "error", message: err.message };
  }
};

//! The getUsers() function does the following:
// 1. Fetches all users from the database without any filters.
// 2. Returns a status "ok" and an array of all users.
// 3. Handles any errors that may occur during the database query.

const getUsers = async () => {
  try {
    const users = await User.find({});
    return { status: "ok", users };
  } catch (err) {
    return { status: "error", message: err.message };
  }
};

//! The loginUser() function does the following:
// 1. Receives email and password from the user.
// 2. Searches the database for a user with the given email.
// 3. If the user is not found, returns an "invalid email or password" error.
// 4. Compares the provided password with the hashed password in the database using bcrypt.
// 5. If the password does not match, returns the same error for security.
// 6. If authentication is successful, generates a JWT token containing the user's ID and role.
// 7. Returns the user object along with the token.
// 8. Handles any errors that occur during the process.

const loginUser = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user)
      return { status: "error", message: "Ugyldig email eller password" };

    const match = await bcrypt.compare(password, user.hashedPassword);
    if (!match)
      return { status: "error", message: "Ugyldig email eller password" };

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return { status: "ok", user, token };
  } catch (err) {
    return { status: "error", message: err.message };
  }
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  getUsers,
  loginUser,
};
