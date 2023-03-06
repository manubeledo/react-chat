export default function SetUserFront (props) {
    return(
        <>
        <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
        </div>
        <form onSubmit={props.sendData}>
            <label>Username</label>
            <input onChange={props.handleChange} type="text" name="username" placeholder="Email or Phone" id="username"/>

            <label>Password</label>
            <input onChange={props.handleChange} type="password" name="pswd" placeholder="Password" id="password"/>

            <button>Log In</button>
            <div className="social">
            <div className="go"><i className="fab fa-google"></i>  Google</div>
            <div className="fb"><i className="fab fa-facebook"></i>  Facebook</div>
            </div>
        </form>
        </>
    )
}

