import 'react'
import { SignIn, SignUp, SignedIn, SignedOut } from '@clerk/clerk-react'

export function AuthenticationPage() {
  return 
    <div className="auth-container">
        <SignedOut>
            <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
            <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
        </SignedOut>
        <SignedIn>
            <div className='redirect-message'>
                <p>You are already signed in</p>
            </div>
        </SignedIn>
    </div>
    }
