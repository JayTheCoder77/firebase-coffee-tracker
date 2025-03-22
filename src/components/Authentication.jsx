export default function Authentication(){
    return(
        <>
            <h2 className="sign-up-text">Sign Up / Log In</h2>
            <p>Sign In To Account</p>
            <input placeholder="Email" />
            <input placeholder="******" type="password" />
            <button><p>Submit</p></button>
            <hr />
            <div className="register-content">
                <p>Don&apos;t have an account?</p>
                <button><p>Sign Up</p></button>
            </div>
        </>
    )
}