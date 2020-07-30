const User = require("../../models/user");

const Notification = require("../../models/helpers/notification");

module.exports = {
  deleteNotification: async (args, req) => {
    //TODO: Agarrar el error en el frontend y mostrar lo MustLoginModal

    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      const user = await User.findOne({ _id: req.userId });
      user.notifications.pull(args.notificationId);
      user.save();

      await Notification.deleteOne({ _id: args.notificationId });
      return args.notificationId;
    } catch (err) {
      throw err;
    }
  },
};
