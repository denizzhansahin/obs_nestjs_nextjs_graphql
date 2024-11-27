import { gql, useQuery } from "@apollo/client";

export const GET_ALL_GRADES = gql`
  query {
    getAllGrades {
      id
      grade_type
      grade_value
      created_at
      updated_at
      enrollments {
        id
        enrollment_date
        status
        course {
          id
          name
        }
        students {
          userId
          first_name
          last_name
        }
        academician {
          userId
          first_name
          last_name
        }
      }
    }
  }
`;
