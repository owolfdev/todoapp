import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

function Navbar() {
  const { data: session } = useSession();

  const Logout = () => {
    return (
      <button
        onClick={() => signOut()}
        className="rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4"
      >
        Log Out
      </button>
    );
  };

  const Login = () => {
    return (
      <button
        onClick={() => signIn()}
        className="rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4"
      >
        Log In
      </button>
    );
  };
  return (
    <nav className="flex justify-between items-center py-4">
      <p className="text-2xl font-bold text-grey-800">Todos App</p>
      <p>{session && `Welcome, ${session.user.name}!`}</p>
      <div className="flex">{session ? <Logout /> : <Login />}</div>
    </nav>
  );
}

export default Navbar;
