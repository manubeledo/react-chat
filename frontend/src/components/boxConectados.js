export default function Conectados (props) {
    console.log(props.data, 'la data desde conectados')
    return(
        <>
        {props.data.map((props) => (
              <li className="clearfix" id="clearfix">
              <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="avatar"/>
              <div className="about">
                      <div className="name">{props}</div>
                  <div className="status"> <i className="fa fa-circle offline"></i> left 7 mins ago </div>                                            
              </div>
          </li>
        ))} 
        </>
    )
}