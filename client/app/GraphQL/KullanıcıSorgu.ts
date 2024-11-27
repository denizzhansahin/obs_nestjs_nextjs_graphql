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