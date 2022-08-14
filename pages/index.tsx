import Head from "next/head";
import { table, minifyItems } from "../utils/Airtable";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ItemsContext } from "../context/ItemsContext";
import Item from "../components/Item";
import ItemForm from "../components/ItemForm";

interface InitialProps {
  [initialItems: string]: [];
}

export default function Home({ initialItems }: InitialProps) {
  const { items, setItems, count, setCount } = useContext(ItemsContext);
  const tableFrameRef = useRef<HTMLIFrameElement>(null);
  const [iframeKey, setIframeKey] = useState(String);
  //console.log(initialItems);
  useEffect(() => {
    setItems(initialItems);
    //document.getElementById("airtable-frame").contentWindow.location.reload();
    //console.log(tableFrameRef);
    //console.log("updated");
  }, [initialItems, setItems]);

  useEffect(() => {
    console.log("updated");
    console.log(tableFrameRef);
    setCount(count + 1);
    //tableFrameRef.current?.contentWindow?.location.reload();
  }, [items]);

  useEffect(() => {
    setIframeKey(count);
  });

  //

  return (
    <div className="container mx-auto my-6 max-w-xl">
      <Head>
        <title>OWolf's Todos</title>
      </Head>

      <main>
        <h1>OWolf's Todos</h1>
        <ItemForm />
        <ul>
          {items &&
            items.map((item: any) => <Item key={item.id} item={item} />)}
        </ul>
        <br />
        <p>
          This is an embed of the view in Airtable, which stores our todo data.
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
