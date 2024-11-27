import { gql } from "@apollo/client";

export const GET_ALL_COURSE_INSTRUCTORS = gql`
query {
  getAllCourseInstructors {
    id
    assigned_date
    course {
      id
      name
      code
    }
    instructor {
      userId
      first_name
      last_name
      email
    }
  }
}

`;




