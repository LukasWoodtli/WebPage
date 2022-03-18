import React from "react";
import MenuBar from "./menu-bar";
import Footer from "./footer";


function Spacer() {
    return (<div style={{flex: "1 0 auto"}}/>);
}


function Layout({children} :any) {
    return (
        <div className="App"
             style={{
                 display: "flex",
                 flexDirection: "column",
                 minHeight: "100vh"
             }}>

            <MenuBar/>

            {children}

            <Spacer/>

            <Footer style={{display: "flex"}}/>
        </div>
    );
}

export default Layout;
