export default function getItemsQuery() {
  return {
    query: `
        query {
          items {
            _id
            category
            description
            type
            date
            location
            itemCreatorQuestion
            creator {
              _id
              email
            }
            createdAt
          }
        }
      `,
  };
}
