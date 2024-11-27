import { gql, useQuery } from "@apollo/client";

export const GET_ALL_ENROLLMENT = gql`
query {
    getEnrollments {
      id
      enrollment_date
      academician{first_name userId}
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
        courseInstructors {
          id
          instructor {
            userId
            first_name
          }
        }
      }
  
      grades {
        id
        grade_type
        grade_value
      }
    }
  }}
  }
`;




