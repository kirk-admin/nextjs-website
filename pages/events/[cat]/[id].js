import Image from "next/image";
import { useRouter } from "next/router";
import React, { useRef } from "react";

const Page = ({ data }) => {
  const inputEmail = useRef();
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    const emailValue = inputEmail.current.value;
    const eventID = router?.query.id;

    try {
      const response = await fetch("/api/email-registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailValue, eventID }),
      });
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      console.log("POST", data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <Image src={data.image} width="500" height="500" alt={data.id} />
      <h2>{data.title}</h2>

      <p>{data.description}</p>
      <form onSubmit={onSubmit}>
        <label>Subscribe</label>
        <input
          ref={inputEmail}
          type="email"
          id="email"
          placeholder="Please insert your email here"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Page;

export async function getStaticPaths() {
  const { allEvents } = await import("/data/data.json");
  const allPaths = allEvents.map((path) => {
    return {
      params: {
        cat: path.city,
        id: path.id,
      },
    };
  });
  return {
    paths: allPaths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { allEvents } = await import("/data/data.json");
  const id = context?.params.id;
  const eventData = allEvents.find((ev) => ev.id === id);

  return {
    props: { data: eventData },
  };
}
