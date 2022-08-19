import React, { useContext } from "react";
import { ItemsContext } from "../context/ItemsContext";
import { useSession } from "next-auth/react";

const Item = ({ item }) => {
  // for updating and deleting item
  const { updateItem, deleteItem } = useContext(ItemsContext);
  const { data: session } = useSession();

  // Update the record when the checkbox is checked
  const handleCompleted = () => {
    const updatedFields = {
      ...item.fields,
      completed: !item.fields.completed,
    };
    const updatedItem = { id: item.id, fields: updatedFields };
    updateItem(updatedItem);
  };

  const handleDeleteItem = () => {
    console.log(session.user.email, item.fields.user);
    if (session.user.email === process.env.NEXT_PUBLIC_TODO_OWNER) {
      deleteItem(item.id);
    } else if (session.user.email === item.fields.user) {
      deleteItem(item.id);
    } else {
      alert("You can only delete your own todos.");
    }
  };

  return (
    <li className="bg-white flex items-center shadow-lg rounded-lg my-2 py-2 px-4">
      <input
        type="checkbox"
        name="brought"
        id="brought"
        checked={item.fields.completed}
        className="mr-2 form-chechbox h-5 w-5"
        onChange={handleCompleted}
      />
      <p
        className={`flex-1 text-gray-800 ${
          item.fields.completed ? "line-through" : ""
        }`}
      >
        {item.fields.item}
      </p>
      {/* delete item when the delete button is clicked*/}
      <button
        type="button"
        className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded"
        onClick={handleDeleteItem}
      >
        Delete
      </button>
    </li>
  );
};

export default Item;
