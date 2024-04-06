import QueryCard from "./card";
import sampledata from "./samplequeries.json";

export default function QueriesList() {
    return (
        <div className="flex flex-col mt-24">
            <h1 className="text-black text-2xl"> Customer&apos;s Queries: </h1>
            <div className="">
                {/* Using .map function to render QueryCards for each entry in the JSON data */}
                {sampledata.map((query, index) => (
                    <QueryCard
                        key={index}
                        ticketID={query.ticket_id}
                        user={query.user}
                        subject={query.summary}
                    />
                ))}
            </div>
        </div>
    );
}
