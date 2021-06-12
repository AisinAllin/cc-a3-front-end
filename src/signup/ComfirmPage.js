import React from "react";
import {useHistory} from "react-router-dom";
import "./ComfirmPage.css";

const ComfirmPage = () => {
    const history = useHistory();

    const handleClick = () => {
        history.push("/login");
    };
    return (
        <div>
            <h1 className="comfirmInfo">
                An verfiy email has been send to your email box, <p/>
                please check your email!
            </h1>
            <div className="comfirmLink" onClick={handleClick}>
                click here to login!
            </div>
        </div>
    );
};

export default ComfirmPage;
