const User = require("../../models/user");

const Notification = require("../../models/helpers/notification");
const { transformNotification } = require("./merge");

module.exports = {
  userNotifications: async (args, req) => {
    //TODO: Agarrar el error en el frontend y mostrar lo MustLoginModal
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      const notifications = await Notification.find({
        userToNotify: req.userId,
      });

      return notifications.map((notification) => {
        return transformNotification(notification);
      });
    } catch (err) {
      throw err;
    }
  },
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
