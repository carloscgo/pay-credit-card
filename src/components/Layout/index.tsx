import routes, { Link, Route, Routes } from "../../utils/routes";
import Products from "../Products";

// MOCK
const products = [
    {
        name: 'Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport',
        image: 'https://flowbite.com/docs/images/products/apple-watch.png',
        price: 599,
    },
    {
        name: 'Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport',
        image: 'https://flowbite.com/docs/images/products/apple-watch.png',
        price: 599,
    },
    {
        name: 'Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport',
        image: 'https://flowbite.com/docs/images/products/apple-watch.png',
        price: 599,
    },
    {
        name: 'Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport',
        image: 'https://flowbite.com/docs/images/products/apple-watch.png',
        price: 599,
    },
    {
        name: 'Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport',
        image: 'https://flowbite.com/docs/images/products/apple-watch.png',
        price: 599,
    },
    {
        name: 'Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport',
        image: 'https://flowbite.com/docs/images/products/apple-watch.png',
        price: 599,
    },
    {
        name: 'Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport',
        image: 'https://flowbite.com/docs/images/products/apple-watch.png',
        price: 599,
    },
    {
        name: 'Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport',
        image: 'https://flowbite.com/docs/images/products/apple-watch.png',
        price: 599,
    },
    {
        name: 'Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport',
        image: 'https://flowbite.com/docs/images/products/apple-watch.png',
        price: 599,
    },
    {
        name: 'Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport',
        image: 'https://flowbite.com/docs/images/products/apple-watch.png',
        price: 599,
    },
];

const Layout = () => {
    return (
        <div className="backdrop flex">
            <div className="back-layer bg-gray-200 text-blue-700">
                <header className="flex items-center justify-between gap-3">
                    <h1 className="title">Shop Payment</h1>

                    <div className="flex gap-10 mx-10">
                        <Link to={routes.home} className="button">Home</Link>
                        <Link to={routes.payment} className="button">Paymemt</Link>
                    </div>
                </header>
            </div>
            <div className="front-layer bg-white p-[80px]">
                <Routes>
                    <Route path={routes.home} element={<Products products={products} />} />
                    <Route path={routes.payment} element={<p>Payment</p>} />
                    <Route path='*' element={<p>404</p>} />
                </Routes>
            </div>
        </div>
    );
};

export default Layout;