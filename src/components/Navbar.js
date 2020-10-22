import React from "react";
import { Menu as Nav, Button } from "element-react";
import {NavLink} from "react-router-dom";

const Navbar = ({user, handleSignOut}) => (
    <Nav mode={"horizontal"} defaultActive={"1"}>
        <div className={"nav-container"}>
            {/*app title / icon */}
            <Nav.Item index={'1'}>
                <NavLink to={"/"} className={"nav-link"}>
                    <span className={"app-title"}>
                        Blogs App
                    </span>
                </NavLink>
            </Nav.Item>

            {/*navbar items*/}
            <div className="nav-items">
                <Nav.Item index={"2"}>
                    <span className={"app-user"}>
                        Hello, {user.username}
                    </span>
                </Nav.Item>
                <Nav.Item index={"4"}>
                    <Button type={"warning"} onClick={handleSignOut}>
                        Sign Out
                    </Button>
                </Nav.Item>
            </div>
        </div>
    </Nav>
)

export default Navbar;
