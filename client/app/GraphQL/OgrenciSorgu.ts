import { gql } from "@apollo/client";



export const GET_ALL_STUDENT = gql`
query {
  getStudents {
    userId
    first_name
    last_name
    email
    phone
    birth_date
    enrollment_date
    status
    created_at
    updated_at
    user {
      id
      username
    }

  }
}

`

export const CREATE_STUDENT = gql`
  mutation CreateStudent($studentData: CreateStudentDto!) {
    createStudent(input: $studentData) {
      id
      name
      email
      role
    }
  }
`;