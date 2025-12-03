"use client";
import "../globals.css";

export default function Navbar(){
    return (
        <div className="navbar">
            <button className="icon_btn">
                <img src="/menu.png" alt="menu" width={32} height={32}/>
            </button>
            <div className="navbar_center">
                <img src="/logo.png" alt="logo" width={110} height={110}/>
            </div>
            <button className="icon_btn">
                <img src="/settings.png" alt="settings" width={32} height={32}/>
            </button>
        </div>
    )
}