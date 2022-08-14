import "tailwindcss/tailwind.css";
import { ItemsProvider } from "../context/ItemsContext";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ItemsProvider>
      <Component {...pageProps} />
    </ItemsProvider>
  );
}

export default MyApp;
