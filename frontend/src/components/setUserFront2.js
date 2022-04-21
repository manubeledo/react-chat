//import { useNavigate } from "react-router-dom";
export default function SetUserFront (props) {
    return(
        <>
        <div class="background">
        <div class="shape"></div>
        <div class="shape"></div>
        </div>
        <form onSubmit={props.sendData}>

        <label for="username">Username</label>
        <input onChange={props.handleChange} type="text" placeholder="Email or Phone" id="username"/>

        <label for="password">Password</label>
        <input type="password" placeholder="Password" id="password"/>

        <button>Log In</button>
        <div className="social">
        <div className="go"><i className="fab fa-google"></i>  Google</div>
        <div className="fb"><i className="fab fa-facebook"></i>  Facebook</div>
        </div>
        </form>
        </>
    )
}

