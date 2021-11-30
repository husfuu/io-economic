import Link from "next/link";
export default function Footer() {
  return (
    <div>
      <div className="min-w-full bg-white py-5">
        <div className="container mx-auto">
          <div className="border-gray-300 flex flex-col items-center">
            <div className="sm:w-2/3 text-center">
              <p className="flex flex-row text-sm font-medium mb-2 justify-center items-center opacity-90">
                © 2021 Made with Love by Sainseni
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
