import Image from "next/image";
import Link from "next/link";
import React from "react";

const index = ({ data, pageName }) => {
  return (
    <div>
      <h1>Events in {pageName}</h1>
      <main>
        {data.map((ev) => (
          <Link key={ev.id} href={`/events/${ev.city}/${ev.id}`}>
            <h2>{ev.title}</h2>
            <Image src={ev.image} width="300" height="300" alt={ev.id} />

            <p>{ev.description}</p>
          </Link>
        ))}
      </main>
    </div>
  );
};

export default index;

export async function getStaticPaths() {
  const { events_categories } = await import("/data/data.json");
  const allPaths = events_categories.map((ev) => {
    return {
      params: {
        cat: ev.id.toString(),
      },
    };
  });

  return {
    paths: allPaths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const id = context?.params.cat;
  const { allEvents } = await import("/data/data.json");
  const data = allEvents.filter((ev) => ev.city === id);

  return { props: { data, pageName: id } };
}
