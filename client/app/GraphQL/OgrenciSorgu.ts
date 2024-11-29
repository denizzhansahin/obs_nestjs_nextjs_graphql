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
mutation createStudent($userId: Int!, $first_name: String!, $last_name: String!, $email: String!, $phone: String!, $birth_date: DateTime!, $enrollment_date: DateTime!, $status: String!) {
  createStudent(createdStudentData: {
    userId: $userId,
    first_name: $first_name,
    last_name: $last_name,
    email: $email,
    phone: $phone,
    birth_date: $birth_date,
    enrollment_date: $enrollment_date,
    status: $status
  }) {
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
  }
}
`;

export const UPDATE_STUDENT = gql`
mutation updateStudent($userId: Float!, $updateStudentData: UpdateStudentDto!) {
  updateStudent(userId: $userId, updateStudentData: $updateStudentData) {
    userId
    first_name
    last_name
    email
    phone
    birth_date
    enrollment_date
    status
    updated_at
  }
}
`;


export const GET_STUDENT_BY_ID = gql`
query getStudentById($id: Float!) {
  getStudentById(id: $id) {
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
  }
}
`

