import Image from "next/image";
import Link from "next/link";
import React from "react";

const index = ({ data }) => {
  return (
    <div>
      <h1>Events</h1>
      {data.map((ev) => (
        <Link key={ev.id} href={`/events/${ev.id}`}>
          <h2>{ev.title}</h2>
          <Image src={ev.image} width="300" height="300" alt={ev.id} />
        </Link>
      ))}
    </div>
  );
};

export default index;

export async function getStaticProps() {
  const { events_categories } = await import("/data/data.json");

  return {
    props: {
      data: events_categories,
    },
  };
}
