export default function getRegisterQuery(data) {
  return {
    query: `
        mutation CreateUser($email: String! , $password: String!, $firstName: String!, $lastName: String!, $phoneNumber: String) {
          createUser(userInput: {email: $email, password: $password, firstName: $firstName, lastName: $lastName , phoneNumber: $phoneNumber }) {
            _id
            email
          }
        }
      `,
    variables: {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber ? data.phoneNumber : "",
    },
  };
}
