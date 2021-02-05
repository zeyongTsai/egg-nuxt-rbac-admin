/*
 * @Author: caizeyong
 * @Date: 2021-01-26 00:21:49
 * @Description:
 */
export default async (context) => {
  const { store, redirect, route } = context
  let unchecked = [
    '/login',
    '/unauthorized'
  ]
  let checked = store.getters.pages.map(p => p.url)
  if (checked.includes('/dashboard')) {
    checked.push('/')
  }
  if (!unchecked.includes(route.path)) {
    if (!checked.includes(route.path)) {
      redirect('/unauthorized')
    }
  }
}
