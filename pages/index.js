import { useAuth } from '../lib/auth'

export default function Index() {
    const auth = useAuth()

    return auth.user ? (
        <div className="mx-auto max-w-screen-lg py-8">
            <p className="text-lg font-bold">Email: {auth.user.email}</p>
            <button
                className="rounded-md px-4 py-3 font-medium text-red-500 transition-all duration-300 ease-in-out hover:bg-red-50 hover:text-red-800"
                onClick={(e) => auth.signout()}
            >
                Sign Out
            </button>
        </div>
    ) : (
        <div className=" mx-auto flex max-w-screen-lg flex-col items-center space-y-4 py-8">
            <button
                className="max-w-fit rounded-md bg-blue-500 px-4 py-3 font-medium text-white transition-all duration-300 ease-in-out hover:bg-blue-600"
                onClick={(e) => auth.signinWithGitHub()}
            >
                Sign In with GitHub
            </button>
            <button
                className="max-w-fit rounded-md bg-blue-500 px-4 py-3 font-medium text-white transition-all duration-300 ease-in-out hover:bg-blue-600"
                onClick={(e) => auth.signinWithGoogle()}
            >
                Sign In with Google
            </button>
        </div>
    )
}
