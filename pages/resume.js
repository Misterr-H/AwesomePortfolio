import React, { useEffect } from "react";

function Resume()  {
    useEffect(() => {
        localStorage.setItem("about-section", "resume");
        window.location.href = "/";
    }, []);


    return (
        <div/>
    )
}

export default Resume;