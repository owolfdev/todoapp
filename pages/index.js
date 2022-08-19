import Head from "next/head";
import { table, minifyItems } from "../utils/Airtable";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ItemsContext } from "../context/ItemsContext";
import Item from "../components/Item";
import ItemForm from "../components/ItemForm";
import Navbar from "../components/Navbar";
import { useSession } from "next-auth/react";

export default function Home({ initialItems }) {
  const { items, setItems, count, setCount } = useContext(ItemsContext);
  const [user, setUser] = useState("");
  const [iframeKey, setIframeKey] = useState(String);
  const { data: session } = useSession();
  useEffect(() => {
    setItems(initialItems);
  }, [initialItems, setItems]);

  useEffect(() => {
    session ? setUser(`${session.user.name}'s`) : "";
  }, [session]);

  useEffect(() => {
    setCount(count + 1);
  }, [items]);

  useEffect(() => {
    setIframeKey(count);
  });

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
            <p>
              <strong>Log in</strong> (with Google) to add todos.
            </p>{" "}
            <p>
              <strong>Note:</strong> Guest users may add only <u>one</u> todo
              😁.
            </p>
          </>
        )}
        <hr />
        <h2 className="text-4xl font-bold leading-normal mt-0 mb-2">
          {`Todos`}
        </h2>
        <ul>
          {items && items.map((item) => <Item key={item.id} item={item} />)}
        </ul>
        <br />
        <hr />
        <br />
        <p>
          Below is an embed of the view from Airtable. Airtable is a hybrid
          spreadsheet and database, which stores the 'todo' data. <br />
          <strong>Note:</strong> Completed items will have a ✅ check mark.
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
