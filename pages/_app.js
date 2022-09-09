import AuthContextProvider from '../lib/auth'
import '../styles/main.css'

function MyApp({ Component, pageProps }) {
    return (
        <AuthContextProvider>
            <Component {...pageProps} />
        </AuthContextProvider>
    )
}

export default MyApp
