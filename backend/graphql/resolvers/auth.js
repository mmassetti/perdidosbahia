const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models//user");
const Notification = require("../../models/helpers/notification");

module.exports = {
  createUser: async (args) => {
    try {
      const existingUser = await User.findOne({ email: args.userInput.email });
      if (existingUser) {
        throw new Error("¡Ya existe un usuario con ese email!");
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      const user = new User({
        firstName: args.userInput.firstName,
        lastName: args.userInput.lastName,
        email: args.userInput.email,
        password: hashedPassword,
        phoneNumber: args.userInput.phoneNumber
          ? args.userInput.phoneNumber
          : null,
      });

      const result = await user.save();

      return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
      throw err;
    }
  },
  login: async ({ email, password }) => {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("¡No existe una cuenta con ese email!");
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new Error("Contraseña incorrecta");
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.SECRET || "somesupersecretkey",
      {
        expiresIn: "1h",
      }
    );

    const notifications = await Notification.find({
      _id: { $in: user.notifications },
    });

    return {
      userId: user.id,
      firstName: user.firstName,
      token: token,
      tokenExpiration: 1,
      hasPendingNotifications: notifications.length > 0 ? true : false,
    };
  },
};
