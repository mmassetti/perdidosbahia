export default function getNewClaimQuery(
  itemId,
  claimerQuestion,
  claimerAnswer
) {
  return {
    query: `
        mutation CreateClaim($id: ID!,$claimerQuestion: String!,$claimerAnswer: String!) {
          createClaim(itemId: $id, claimerQuestion: $claimerQuestion, claimerAnswer: $claimerAnswer) {
            _id
            itemClaimer {
              email
            }
            itemCreator {
              email
            }
            item { 
              description
            }
            stateForClaimer
            stateForItemCreator
            flagClaimer
            flagItemCreator
            claimerQuestion
            claimerAnswer
            createdAt
            updatedAt
          }
        }
      `,
    variables: {
      id: itemId,
      claimerQuestion: claimerQuestion,
      claimerAnswer: claimerAnswer,
    },
  };
}
