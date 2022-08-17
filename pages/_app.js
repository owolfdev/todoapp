import "tailwindcss/tailwind.css";
import { ItemsProvider } from "../context/ItemsContext";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps, session }) {
  return (
    <SessionProvider session={session}>
      <ItemsProvider>
        <Component {...pageProps} />
      </ItemsProvider>
    </SessionProvider>
  );
}

export default MyApp;
