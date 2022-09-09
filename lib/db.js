import { db } from './firebase'
import { doc, setDoc } from 'firebase/firestore'

export function createUser(uid, data) {
    const userRef = doc(db, 'users', uid)
    setDoc(userRef, { uid, ...data }, { merge: true })
}
