const UserModel = require("../models/user.model");

const addUserInDB = async (user, res) => {
  try {
    let existingUser = await UserModel.findOne({ googleId: user.id });

    if (!existingUser) {
      const newUser = await UserModel.create({
        googleId: user.id,
        name: user.displayName,
        email: user.emails[0].value,
      });
      const accessToken = newUser.generateAccessToken();
      const options = {
        httpOnly: true,
        secure: true,
      };
      res.cookie("accessToken", accessToken, options);
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = { addUserInDB };
