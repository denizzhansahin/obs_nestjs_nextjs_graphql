import { gql } from "@apollo/client";

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


export const CREATE_INSTRUCTORS = gql `
mutation createInstructor($createdInstructorsData: CreateInstructorDto!) {
  createInstructors(createdInstructorsData: $createdInstructorsData) {
    userId
    first_name
    last_name
    email
    phone
    department
    birth_date
    enrollment_date
    created_at
    updated_at
  }
}
`


export const GET_INSTRUCTORS_BY_ID = gql`
query getInstructorById($id: Float!) {
  getInstructorById(id: $id) {
    userId
    first_name
    last_name
    email
    phone
    department
    birth_date
    enrollment_date
    created_at
    updated_at
  }
}`



export const UPDATE_INSTRUCTORS = gql`
mutation updateInstructor($userId: Float!, $updateInstructorData: UpdateInstructorDto!) {
  updateInstructors(userId: $userId, updateInstructorsData: $updateInstructorData) {
    userId
    first_name
    last_name
    email
    phone
    department
    birth_date
    enrollment_date
    updated_at
  }
}
`



