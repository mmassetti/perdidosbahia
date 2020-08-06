export default function getNotificationsQuery() {
  return {
    query: `
        query {
          userNotifications{
            _id,
            description,
            itemInvolved {
                _id,
                description,
                category
            },
            itemInfo {
              _id,
              description,
              category
            }
            userToNotify {
                _id,
                email
            }
          }
        }
      `,
  };
}
