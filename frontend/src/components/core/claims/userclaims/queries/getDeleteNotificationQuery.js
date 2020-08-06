export default function getDeleteNotificationQuery(notification) {
  return {
    query: `
        mutation DeleteNotification($notificationId: ID!) {
           deleteNotification(notificationId: $notificationId)
         }
       `,
    variables: {
      notificationId: notification._id,
    },
  };
}
