import { gql, useQuery } from "@apollo/client";

export const GET_ALL_INSTRUCTORS = gql`
query {
  getInstructors {
    userId
    first_name
    last_name
    email
    phone
    birth_date
    enrollment_date
    department
    created_at
    updated_at
    user{id username}
    courseInstructors {id course{id name code credit}}
  }
}

`;




