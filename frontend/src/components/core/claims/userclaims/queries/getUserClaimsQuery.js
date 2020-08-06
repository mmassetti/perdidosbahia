export default function getUserClaimsQuery() {
  return {
    query: `
        query {
          claims {
            _id  
            item {
              _id
              description
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
            }
            itemCreator {
              _id
              email
              firstName
              lastName
              phoneNumber
            }
            itemClaimer {
              _id
              email
              firstName
              lastName
              phoneNumber
            }
            stateForClaimer
            stateForItemCreator
            flagClaimer
            flagItemCreator
            claimerQuestion
            claimerAnswer
            itemCreatorAnswer
          }
        }
      `,
  };
}
