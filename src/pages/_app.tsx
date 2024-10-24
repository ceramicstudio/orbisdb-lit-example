import {useState} from "react";
import { OrbisProvider } from "../../context/OrbisContext";
import { WalletProvider } from "../../context/WalletContext";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@/src/styles/globals.css";  

export const useQueryClient = () => {
  const [queryClient] = useState(() => new QueryClient())
  return queryClient
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  const queryClient = useQueryClient();
  return (
    <>
    <QueryClientProvider client={queryClient}>
    <WalletProvider>
      <OrbisProvider>
        <Component {...pageProps} ceramic />
      </OrbisProvider>
    </WalletProvider>
    </QueryClientProvider>
    </>
  );
};

export default MyApp;
