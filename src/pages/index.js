import Layout from "../components/direction/Layout";
import Link from "next/link";
export default function Home() {
  return (
    <>
      <Layout>
        <div className="flex h-hero-md lg:h-hero-lg 2xl:h-hero-xl justify-center items-center">
          <div className="text-center">
            <h1
              className="
              text-4xl
              font-bold
              leading-none
              tracking-tighter
              text-neutral-600
              md:text-5xl
              lg:text-6xl
            "
            >
              Calculate your
              <br className="hidden lg:block" /> input-output model
            </h1>
            <Link href="/io">
              <button
                className="text-white border border-solid rounded-full bg-two border-two hover:bg-white hover:text-two active:bg-white font-semibold px-8 py-2 rounded outline-none focus:outline-none my-5"
                type="button"
              >
                Try it
              </button>
            </Link>
          </div>
        </div>
      </Layout>
    </>
  );
}
