export default function getDeleteItemQuery(itemId) {
  return {
    query: `
        mutation DeleteItem($itemId: ID!, $notificationDescription: String!) {
           deleteItem(itemId: $itemId, notificationDescription: $notificationDescription)
         }
       `,
    variables: {
      itemId: itemId,
      notificationDescription:
        "Lo sentimos, el otro usuario eliminó la publicación:",
    },
  };
}
