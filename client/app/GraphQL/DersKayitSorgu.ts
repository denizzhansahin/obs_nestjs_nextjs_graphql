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
    academician {
      userId
      first_name
      last_name
      department
    }
   
  }
}
`;


export const CREATE_ENROLLMENT = gql`
mutation createEnrollments($createdEnrollmentsData: CreateEnrollmentsDto!) {
  createEnrollments(createdEnrollmentsData: $createdEnrollmentsData) {
    id
    enrollment_date
    status
    course {
      id
      name
      code
      description
      credit
      semester
    }
    students {
      userId
      first_name
      last_name
      email
    }
    academician {
      userId
      first_name
      last_name
      department
    }
  }
}
`

export const FIND_BY_ENROLLMENT_ID = gql`
query findEnrollmentById($id: Float!) {
  findEnrollmentById(id: $id) {
    id
    enrollment_date
    status
    course {
      id
      name
      code
      description
      credit
      semester
    }
    students {
      userId
      first_name
      last_name
      email
    }
    academician {
      userId
      first_name
      last_name
      department
    }
  }
}
`

export const UPDATE_ENROLLMENT = gql`
mutation updateEnrollments($id: Float!, $updateEnrollmentsData: UpdateEnrollmentsDto!) {
  updateEnrollments(id: $id, updateEnrollmentsData: $updateEnrollmentsData) {
    id
    enrollment_date
    status
    course {
      id
      name
      code
      description
      credit
      semester
    }
    students {
      userId
      first_name
      last_name
      email
    }
    academician {
      userId
      first_name
      last_name
      department
    }
  }
}
`


