export default function getLoginQuery(email, password) {
  return {
    query: `
    query Login($email: String!, $password: String!){
      login(email: $email, password: $password) {
        userId
        token
        tokenExpiration
        firstName
        hasPendingNotifications
      }
    }
  `,
    variables: {
      email: email,
      password: password,
    },
  };
}
