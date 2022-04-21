//import { useNavigate } from "react-router-dom";
export default function SetUserFront (props) {
    //const navigate = useNavigate()
    return(
        <>
        <form onSubmit={props.sendData}>
            <div>
                <label>Username</label>
                <input onChange={props.handleChange} type="text" name="username" placeholder="Username"/>
            </div>
            <button type="submit" className="ui basic button">
            <i className="icon user"></i>
            Ingresar
            </button>
        </form>
        </>
    )
}