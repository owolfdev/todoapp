import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

function Navbar() {
  const { data: session } = useSession();
  return (
    <nav className="flex justify-between items-center py-4">
      <p className="text-2xl font-bold text-grey-800">My Todos</p>
      <p>{session && `Welcome ${session.user.name}`}</p>
      <div className="flex">
        <button
          onClick={() => signOut()}
          className="rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4"
        >
          Log Out
        </button>
        <button
          onClick={() => signIn()}
          className="rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4"
        >
          Log In
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
