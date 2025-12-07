
export function Footer() {
    return (
        <footer className="bg-gray-800 text-gray-200 py-6 mt-12 ">
            <div className="container mx-auto px-4 text-center">
                <p>&copy; {new Date().getFullYear()} Good Hamburguer. All rights reserved.</p>
                <p>The link for see the orders is <a href="/orders" className="text-orange-500 hover:underline">Orders Page</a></p>
            </div>
        </footer>
    );
}