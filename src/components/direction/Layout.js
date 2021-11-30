import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout(props) {
  const blog = props.blog;

  return (
    <div>
      <Head>
        <title>IO-Economic</title>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <meta name="theme-color" content="f69435" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="keywords" content="IO Economic" />
        <meta name="author" content="Khoironi Kurnia Syah" />

        <link rel="icon" type="image/svg+xml" href="/wallet.svg" />

        {/* <!-- Primary Meta Tags --> */}
        <meta name="title" content="IO-Economic" />
        <meta name="description" content="IO-Economic" />
        <meta
          property="og:site_name"
          content="Khoironi Kurnia Syah"
          key="ogsitename"
        />
      </Head>
      <Navbar />
      {props.children}
      <script
        type="module"
        src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
      ></script>
      <script
        noModule
        src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"
      ></script>
      <Footer />
    </div>
  );
}
