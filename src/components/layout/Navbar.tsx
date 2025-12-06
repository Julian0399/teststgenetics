import Link from "next/link";

export function Navbar() {
  return (
    <header className="bg-gradient-to-r from-orange-500 to-red-500 shadow-lg">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white">
            <span className="material-icons">fastfood</span>
            <h1 className="text-2xl font-bold">Good Hamburguer</h1>
          </Link>
          <button className="relative bg-white text-orange-600 px-4 py-2 rounded-full font-semibold hover:bg-orange-50 transition-colors flex items-center gap-2">
            <span className="material-icons">shopping_cart</span>
            Cart
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              0
            </span>
          </button>
        </div>
      </nav>
    </header>
  );
}
