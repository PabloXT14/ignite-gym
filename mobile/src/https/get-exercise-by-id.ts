import { api } from '../services/api'

import type { ExerciseDTO } from '../dtos/exercise-dto'

export async function getExerciseById(id: string) {
  const response = await api.get(`/exercises/${id}`)

  const exercise = response.data as ExerciseDTO

  return exercise
}
