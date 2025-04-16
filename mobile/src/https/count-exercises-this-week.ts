import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'

dayjs.extend(isoWeek)
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)

import { api } from '../services/api'
import type { HistoryByDayDTO } from '../dtos/history-by-day-dto'

export async function countExercisesThisWeek() {
  const response = await api.get('/history')

  const history = response.data as HistoryByDayDTO[]

  let count = 0
  const now = dayjs()
  const startOfWeek = now.startOf('isoWeek')
  const endOfWeek = now.endOf('isoWeek')

  history.map(day => {
    day.data.map(exercise => {
      const exerciseDate = dayjs(exercise.created_at)

      if (
        exerciseDate.isSameOrAfter(startOfWeek) &&
        exerciseDate.isSameOrBefore(endOfWeek)
      ) {
        count++
      }

      return
    })
  })

  return { count }
}
