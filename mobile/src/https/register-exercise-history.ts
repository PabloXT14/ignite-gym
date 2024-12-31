import { api } from '../services/api'

type RegisterExerciseHistoryRequest = {
  exerciseId: string
}

export async function registerExerciseHistory({
  exerciseId,
}: RegisterExerciseHistoryRequest) {
  await api.post('/history', { exercise_id: exerciseId })
}
