import '@/styles/globals.css'
import { UsersDataProvider } from '../context/user_context'

export default function App({ Component, pageProps }) {
  return (
    <UsersDataProvider>
      <Component {...pageProps} />
    </UsersDataProvider>
  )
}
