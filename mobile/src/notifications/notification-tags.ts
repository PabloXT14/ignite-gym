import { OneSignal } from 'react-native-onesignal'

export function updateTotalExercisesOnWeekTag(total: string) {
  OneSignal.User.addTag('total_exercises_on_week', total)
}

export function updateIsLoggedInTag(isLoggedIn: boolean) {
  OneSignal.User.addTag('is_logged_in', String(isLoggedIn))
}
