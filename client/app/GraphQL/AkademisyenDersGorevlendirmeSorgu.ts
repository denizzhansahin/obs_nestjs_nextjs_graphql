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

export const CREATE_INSTRUCTORS_COURSE = gql`
mutation assignCourseToInstructor($assignCourseInstructorData: CreateCourseInstructorDto!) {
  createCourseInstructor(createCourseInstructorDto: $assignCourseInstructorData) {
    id
    course {
      id
      name
      code
    }
    instructor {
      userId
      first_name
      last_name
    }
    assigned_date
  }
}

`





export const UPDATE_INSTRUCTORS_COURSE = gql`
mutation updateCourseInstructor($updateCourseInstructorDto: UpdateCourseInstructorDto!) {
  updateCourseInstructor(updateCourseInstructorDto: $updateCourseInstructorDto) {
    id
    course {
      id
      name
      code
      semester
    }
    instructor {
      userId
      first_name
      last_name
      department
    }
    assigned_date
  }
}

`


export const GET_INSTRUCTORS_COURSE_BY_ID = gql`
query getCourseInstructorById($id: Int!) {
  getCourseInstructorById(id: $id) {
    id
    course {
      id
      name
      code
      semester
    }
    instructor {
      userId
      first_name
      last_name
      department
    }
    assigned_date
  }
}
`