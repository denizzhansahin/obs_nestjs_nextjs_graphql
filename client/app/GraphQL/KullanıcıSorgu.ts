import { gql } from "@apollo/client";



export const GET_ALL_USERS = gql`
query {
  getUsers{
    id
    username
    password
    role
    created_at
    updated_at
    student{userId first_name}
    instructors{userId first_name}
  }
}
`



export const CREATE_USER = gql`
mutation CreateUser($input: CreateUserDto!) {
  createUser(createdUserData: $input) {
    id
    username
    role
    created_at
  }
}`


export const UPDATE_USER = gql`
mutation UpdateUser($userId: Float!, $updateUserData: UpdateUserDto!) {
  updateUser(userId: $userId, updateUserData: $updateUserData) {
    id
    username
    role
    created_at
    updated_at
  }
}
`;
