import React from 'react';
import Link from 'next/link';

export default function QueryCard({ ticketID, user, subject }) {
  return (
    <Link href={`/chat/${ticketID}`}>
        <div className="bg-[#406AFF] w-[25rem] h-28 xl:w-[40rem] rounded-xl mt-5 p-4 flex flex-col">
          <h1 className="text-white md:text-xl"> # {ticketID} </h1>
          <h1 className="text-white md:text-xl"> User: {user} </h1>
          <h1 className="text-white md:text-xl"> Subject: {subject} </h1>
        </div>
    </Link>
  );
}
