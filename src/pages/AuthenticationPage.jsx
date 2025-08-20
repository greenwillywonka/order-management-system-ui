import 'react'
import { SignIn, SignUp, SignedIn, SignedOut } from '@clerk/clerk-react'
import styles from "./AuthenticationPage.module.css"

export function AuthenticationPage() {
  return (
    <div className={styles.authContainer}>
        <SignedOut>
            <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
            <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
        </SignedOut>
        <SignedIn>
            <div className={styles.redirectMessage}>
                <p>You are already signed in</p>
            </div>
        </SignedIn>
    </div>
  )
    }
