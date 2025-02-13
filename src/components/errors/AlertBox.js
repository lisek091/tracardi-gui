import React from "react";
import "./AlertBox.css";
import {FiAlertTriangle} from "@react-icons/all-files/fi/FiAlertTriangle";

export default function AlertBox({children}) {

    return <div className="AlertBox">
        <div>
            <FiAlertTriangle size={25}/>
        </div>
        <section className="AlertDetails">
            {children}
        </section>
    </div>

}