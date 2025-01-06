import React from "react";
import MenuBar from "./menu-bar";
import Footer from "./footer";

import '@fortawesome/fontawesome-svg-core/styles.css';
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false; /* eslint-disable import/first */

function Spacer() {
    return (<div style={{flex: "1 0 auto"}}/>);
}


function Layout({children} :any) {
    return (
      <>
        <div className="document-wrapper"
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
      </>
    );
}

export default Layout;
