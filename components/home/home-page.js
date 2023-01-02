import Image from "next/image";
import Link from "next/link";

const HomePage = ({ data }) => {
  return (
    <main>
      {data.map((ev) => (
        <Link key={ev.id} href={`/events/${ev.id}`}>
          <h2>{ev.title}</h2>
          <Image src={ev.image} width="300" height="300" alt={ev.id} />

          <p>{ev.description}</p>
        </Link>
      ))}
    </main>
  );
};

export default HomePage;
