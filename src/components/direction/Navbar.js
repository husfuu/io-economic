import Link from "next/link";

export default function Navbar({}) {
  return (
    <>
      <nav className="fixed w-screen z-10 top-0 py-4 bg-white">
        <div className="container px-4 w-auto mx-auto md:flex md:items-center md:w-4/5 lg:w-3/5">
          <div className="flex w-full md:flex-row justify-between items-center text-sm font-medium">
            <Link href="/">
              <a className="p-2 md:mx-4 opacity-70 hover:opacity-100">Home</a>
            </Link>

            <Link href="/io">
              <a className="p-2 md:mx-4 opacity-70 hover:opacity-100">
                Product
              </a>
            </Link>

            <Link href="https://github.com/sainseni">
              <a className="p-2 md:mx-4 opacity-70 hover:opacity-100">About</a>
            </Link>

            <Link href="https://github.com/sainseni">
              <a className="p-2 md:mx-4 opacity-70 hover:opacity-100">
                Contact
              </a>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
