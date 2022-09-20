import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { RecoilRoot } from "recoil";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Layout from "../components/Layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider defaultTheme="dark">
      <RecoilRoot>
        <Toaster />
        <Layout>
          <div id="root">
            <header>
              <Header />
            </header>
            <main>
              <Component {...pageProps} />
            </main>
            <Footer />
          </div>
        </Layout>
      </RecoilRoot>
    </ThemeProvider>
  );
}

export default MyApp;
