
import {logout } from './actions'

export default function LogoutPage() {
  return (
    <form>
      <button formAction={logout}>Log out</button>
    </form>
  )
}