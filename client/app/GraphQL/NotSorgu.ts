import { gql } from "@apollo/client";

export const GET_ALL_GRADES = gql`
query GetAllGrades {
  getAllGrades {
    id
    grade_type
    grade_value
    created_at
    updated_at

  }
}
`;


export const CREATE_GRADE = gql`
mutation createGrade($createGradeInput: CreateGradesDto!) {
  createGrade(createGradeInput: $createGradeInput) {
    id
    grade_type
    grade_value
    created_at
    updated_at

  }
}

`