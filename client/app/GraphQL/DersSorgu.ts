import { gql } from "@apollo/client";

export const GET_ALL_LESSON = gql`
query {
  getCourses {
    id
    name
    code
    description
    credit
    semester
    created_at
    updated_at
    courseInstructors {
      id
      assigned_date
      instructor {userId first_name}
    }
  }
}

`;




