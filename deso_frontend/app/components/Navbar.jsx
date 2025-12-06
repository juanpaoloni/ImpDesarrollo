import DropdownMenu from "./DropdownMenu.jsx"

export default function Navbar(){
   
    return (
        <div className="navbar">
            <button className="icon_btn">
                <img src="/menu.png" alt="menu" width={38} height={38}/>
            </button>
            <div className="navbar_center">
                <img src="/logo.png" alt="logo" width={110} height={110}/>
            </div>
           
             <DropdownMenu />
        </div>
    )
}