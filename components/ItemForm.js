// /components/ItemForm.js
import React, { useState, useContext, useEffect } from "react";
import { ItemsContext } from "../context/ItemsContext";
import { useSession, signIn, signOut } from "next-auth/react";

const ItemForm = () => {
  const [item, setItem] = useState("");
  const [user, setUser] = useState(process.env.TODO_OWNER);
  const { addItem, items } = useContext(ItemsContext);
  const { data: session } = useSession();
  //const [guestHasTodo, setGuestHasTodo] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const guestHasTodo = testForTodos();
    console.log(guestHasTodo);
    if (guestHasTodo) {
      console.log("guest has todo.");
    } else {
      console.log("no todos");
      addItem(item, session.user.email);
      setItem("");
    }
  };

  const testForTodos = () => {
    let guestHasTodo = false;
    console.log(process.env.NEXT_PUBLIC_TODO_OWNER);
    if (session.user.email !== process.env.NEXT_PUBLIC_TODO_OWNER) {
      items.map((item) => {
        if (item.fields.user === session.user.email) {
          alert(
            "You already added a todo. \nDelete your old todo before adding a new one."
          );
          guestHasTodo = true;
        }
      });
    }
    return guestHasTodo;
  };

  return (
    <form className="form my-6" onSubmit={handleSubmit}>
      <div className="flex justify-between w-full">
        <input
          type="text"
          name="item"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          placeholder="ex. Practice Vim"
          className="flex-1 border border-gray-200 p-2 mr-2 rounded-lg appearance-none focus:outline-none focus:border-gray-500"
        />
        <button
          type="submit"
          className="rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4"
        >
          + Add Item
        </button>
      </div>
    </form>
  );
};

export default ItemForm;
