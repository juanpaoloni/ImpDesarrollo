import DropdownMenu from "./DropdownMenu.jsx"
import Sidebar from "./Sidebar.jsx"
import Link from "next/link";

export default function Navbar(){
   
    return (
        <div className="navbar">
            <Sidebar />
            <Link href="/">
                <button className="navbar_center">
                    <img src="/logo.png" alt="logo" width={110} height={110}/>
                </button>
            </Link>
           
             <DropdownMenu />
        </div>
    )
}