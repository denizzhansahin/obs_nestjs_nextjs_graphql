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


export const GET_COURSE_BY_ID = gql`
query findCourseById($id: Float!) {
  findCourseById(id: $id) {
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
      instructor {userId first_name last_name department }
    }
  }
}
`


export const CREATE_COURSE = gql`
mutation createCourses($createdCoursesData: CreateCoursesDto!) {
  createCourses(createdCoursesData: $createdCoursesData) {
    id
    name
    code
    description
    credit
    semester
    created_at
    updated_at
  }
}
`


export const UPDATE_COURSE = gql`
mutation updateCourses($id: Float!, $updateCourseData: UpdateCoursesDto!) {
  updateCourses(id: $id, updateCourseData: $updateCourseData) {
    id
    name
    code
    description
    credit
    semester
    updated_at
  }
}

`


