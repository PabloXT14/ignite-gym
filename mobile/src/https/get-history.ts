import { api } from '../services/api'

import type { HistoryByDayDTO } from '../dtos/history-by-day-dto'

export async function getHistory() {
  const response = await api.get('/history')

  const history = response.data as HistoryByDayDTO[]

  return { history }
}
