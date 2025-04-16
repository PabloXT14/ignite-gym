import { create } from 'zustand'
import { updateTotalExercisesOnWeekTag } from '../notifications/notification-tags'

type ExerciseStore = {
  weeklyExercises: number
  setWeeklyExercises: (count: number) => void
  incrementWeeklyExercises: (amount?: number) => void
  resetWeeklyExercises: () => void
}

export const useExercise = create<ExerciseStore>(set => ({
  weeklyExercises: 0,

  setWeeklyExercises: count => {
    updateTotalExercisesOnWeekTag(count.toString())
    set({ weeklyExercises: count })
  },

  incrementWeeklyExercises: (amount = 1) => {
    set(state => {
      const updated = state.weeklyExercises + amount
      updateTotalExercisesOnWeekTag(updated.toString())
      return { weeklyExercises: updated }
    })
  },

  resetWeeklyExercises: () => {
    updateTotalExercisesOnWeekTag('0')
    set({ weeklyExercises: 0 })
  },
}))
