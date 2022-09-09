import AuthContextProvider from '../lib/auth'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
    return (
        <AuthContextProvider>
            <Component {...pageProps} />
        </AuthContextProvider>
    )
}

export default MyApp
