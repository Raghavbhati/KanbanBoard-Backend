const UserModel = require("../models/user.model");

//if user dont exist add that user in DB, else set the accessToken 
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
      var options = {
        httpOnly: true,
        secure: true,
      };
      console.log("from add to db file ", accessToken);
      return res.cookie("accessToken", accessToken, options);
    }else{
      const accessToken = existingUser.generateAccessToken();
      console.log("from add to db file ", accessToken);
      return res.cookie("accessToken", accessToken, options);
    }
  } catch (error) {
    console.error(error);
  } 
};

module.exports = { addUserInDB };
