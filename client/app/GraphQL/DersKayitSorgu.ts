import { gql } from "@apollo/client";

export const GET_ALL_ENROLLMENT = gql`
query {
  getEnrollments {
    id
    enrollment_date
    status
    created_at
    updated_at
    students {
      userId
      first_name
    }
    course {
      id
      name
    }
    
    grades{id grade_type grade_value}
    
   
  }
}
`;




