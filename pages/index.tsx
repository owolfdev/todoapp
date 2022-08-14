import Head from "next/head";
import { table, minifyItems } from "../utils/Airtable";
import React, { useContext, useEffect } from "react";
import { ItemsContext } from "../context/ItemsContext";
import Item from "../components/Item";
import ItemForm from "../components/ItemForm";

interface InitialProps {
  [initialItems: string]: [];
}

export default function Home({ initialItems }: InitialProps) {
  const { items, setItems } = useContext(ItemsContext);
  //console.log(initialItems);
  useEffect(() => {
    setItems(initialItems);
  }, [initialItems, setItems]);
  return (
    <div className="container mx-auto my-6 max-w-xl">
      <Head>
        <title>@Todos</title>
      </Head>

      <main>
        <ItemForm />
        <ul>
          {items && items.map((item) => <Item key={item.id} item={item} />)}
        </ul>
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
