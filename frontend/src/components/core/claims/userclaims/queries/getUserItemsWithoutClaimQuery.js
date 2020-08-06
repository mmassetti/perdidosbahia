export default function getUserItemsWithoutClaimsQuery() {
  return {
    query: `
        query {
          userItemsWithoutClaim {
            _id,
            type,
            description,
            date,
            category,
            location,
            creator {
                _id,
                email
            },
            itemCreatorQuestion
            createdAt
        }    
      }
      `,
  };
}
