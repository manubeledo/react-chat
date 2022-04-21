export default function Userbox() {
    return(
        <div id="plist" className="people-list">
            <ul className="list-unstyled chat-list mt-2 mb-0" id="people-list">
                <li className="clearfix" id="clearfix">
                    <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="avatar"/>
                    <div className="about">
                        <div className="name">Vincent Porter</div>
                        <div className="status"> <i className="fa fa-circle offline"></i> left 7 mins ago </div>                                            
                    </div>
                </li>
            </ul>
        </div>
    )
}