import Head from "next/head";
import { table, minifyItems } from "../utils/Airtable";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ItemsContext } from "../context/ItemsContext";
import Item from "../components/Item";
import ItemForm from "../components/ItemForm";
import Navbar from "../components/Navbar";
import { useSession } from "next-auth/react";

//import { useUser } from "@auth0/nextjs-auth0";

// interface InitialProps {
//   [initialItems: string]: [];
// }

export default function Home({ initialItems }) {
  //const { user, error, isLoading } = useUser();
  const { items, setItems, count, setCount } = useContext(ItemsContext);
  const [user, setUser] = useState("");
  const tableFrameRef = useRef;
  const [iframeKey, setIframeKey] = useState(String);
  //console.log(initialItems);
  const { data: session } = useSession();
  useEffect(() => {
    setItems(initialItems);
    //document.getElementById("airtable-frame").contentWindow.location.reload();
    //console.log(tableFrameRef);
    //console.log("updated");
  }, [initialItems, setItems]);

  useEffect(() => {
    session ? setUser(`${session.user.name}'s`) : "";
  }, [session]);

  useEffect(() => {
    // console.log("updated");
    // console.log(tableFrameRef);
    setCount(count + 1);
    //tableFrameRef.current?.contentWindow?.location.reload();
  }, [items]);

  useEffect(() => {
    setIframeKey(count);
  });

  //

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>{error.message}</div>;

  return (
    <div className="container mx-auto my-6 max-w-xl p-5">
      <Head>
        <title>Todos</title>
      </Head>
      <Navbar />
      <main>
        {session ? (
          <ItemForm />
        ) : (
          <>
            <p>Log in to add todos.</p>{" "}
            <p>
              <strong>Note:</strong> Guest users may add only <u>one</u> todo
              😁.
            </p>
          </>
        )}
        <h2 className="text-4xl font-bold leading-normal mt-0 mb-2">
          {`Todos`}
        </h2>
        <ul>
          {items && items.map((item) => <Item key={item.id} item={item} />)}
        </ul>
        <br />
        <p>
          Below is an embed of the view in Airtable, which stores the 'todo'
          data. Note: Completed items will have a ✅ check mark.
        </p>
        <iframe
          className="airtable-embed"
          key={iframeKey}
          src="https://airtable.com/embed/shrhzhmttU2SXjlkA?backgroundColor=orange&viewControls=on"
          frameBorder="0"
          width="100%"
          height="533"
          style={{ background: "transparent", border: "1px solid #ccc" }}
        ></iframe>
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const items = await table.select({}).firstPage();
    return {
      props: {
        initialItems: minifyItems(items),
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        err: "Something went wrong 😕",
      },
    };
  }
}
