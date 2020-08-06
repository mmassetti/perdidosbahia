export default function getEditClaimThirdStepQuery(
  claimId,
  newStateForClaimer,
  newStateForItemCreator,
  newFlagClaimer,
  newFlagItemCreator
) {
  return {
    query: `
        mutation EditClaim($claimId: ID!, $newStateForClaimer: String!, $newStateForItemCreator: String!, $newFlagClaimer: Int!, $newFlagItemCreator: Int!) {
          editClaim(claimId: $claimId, newStateForClaimer: $newStateForClaimer, newStateForItemCreator: $newStateForItemCreator, newFlagClaimer: $newFlagClaimer, newFlagItemCreator: $newFlagItemCreator) {
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
          }
        }
      `,
    variables: {
      claimId: claimId,
      newStateForClaimer: newStateForClaimer,
      newStateForItemCreator: newStateForItemCreator,
      newFlagClaimer: newFlagClaimer,
      newFlagItemCreator: newFlagItemCreator,
    },
  };
}
