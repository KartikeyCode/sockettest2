import QueryCard from "./card";

export default function QueriesList(){
    return(
        <div className="flex flex-col mt-24 ">
            <h1 className="text-black text-2xl"> Customer's Queries:  </h1>
            <div className="">
                <QueryCard/>
            </div>
        </div>
    )
}