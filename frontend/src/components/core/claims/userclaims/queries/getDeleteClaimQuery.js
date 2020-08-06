export default function getDeleteClaimQuery(claimId) {
  return {
    query: `
        mutation CancelClaim($id: ID!, $notificationDescription: String!) {
           cancelClaim(claimId: $id, notificationDescription: $notificationDescription) {
             _id,
             description
             category
           }
         }
       `,
    variables: {
      id: claimId,
      notificationDescription:
        "Lo sentimos, el otro usuario rechazó el contacto para este objeto:",
    },
  };
}
