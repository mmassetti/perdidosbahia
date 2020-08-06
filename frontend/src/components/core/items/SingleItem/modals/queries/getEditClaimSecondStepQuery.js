export default function getEditClaimSecondStepQuery(
  claimId,
  newStateForClaimer,
  newStateForItemCreator,
  newFlagClaimer,
  newFlagItemCreator,
  itemCreatorAnswer
) {
  return {
    query: `
        mutation EditClaim($claimId: ID!, $newStateForClaimer: String!, $newStateForItemCreator: String!, $newFlagClaimer: Int!, $newFlagItemCreator: Int!, $newItemCreatorAnswer: String!) {
          editClaim(claimId: $claimId, newStateForClaimer: $newStateForClaimer, newStateForItemCreator: $newStateForItemCreator, newFlagClaimer: $newFlagClaimer, newFlagItemCreator: $newFlagItemCreator, newItemCreatorAnswer: $newItemCreatorAnswer) {
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
            createdAt
            updatedAt
            claimerQuestion
            itemCreatorAnswer
          }
        }
      `,
    variables: {
      claimId: claimId,
      newStateForClaimer: newStateForClaimer,
      newStateForItemCreator: newStateForItemCreator,
      newFlagClaimer: newFlagClaimer,
      newFlagItemCreator: newFlagItemCreator,
      newItemCreatorAnswer: itemCreatorAnswer,
    },
  };
}
