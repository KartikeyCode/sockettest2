
import NavbarDash from "../components/navbardash"
import QueriesList from "../components/querieslist"

export default function DashBoard(){
    return(
        <div className="min-h-screen flex flex-col items-center">
            <NavbarDash/>
            <QueriesList/>
        </div>
    )
}