import { api } from '../services/api'
import type { ExerciseDTO } from '../dtos/exercise-dto'

export async function getExercisesByGroup(group: string) {
  const response = await api.get(`/exercises/bygroup/${group}`)

  const exercises = response.data as ExerciseDTO[]

  return exercises
}
