import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Some, httpAxios } from "../utils/httpAxios";
import formatNumber from "../utils/formatNumber";
import { ProductCardProps } from "../components/ProductCard";

type getProductsProps = {
    setProducts: Dispatch<SetStateAction<ProductCardProps[]>>;
    setLoading: Dispatch<SetStateAction<boolean>>;
    setError: Dispatch<SetStateAction<null | string>>;
}

const getProducts = async ({
    setProducts,
    setLoading,
    setError,
}: getProductsProps) => {
    try {
        const products = await httpAxios.get('/products');

        if (products.length) {
            setProducts(products.map((product: Some) => ({
                name: product.title,
                price: formatNumber(product.price),
                image: product.image,
            })));
        }

        setLoading(false);
    } catch (err: unknown) { 
        if (err instanceof Error) {
            console.error(err.message);

            setError(err.message);
        } else {
            console.error('An unknown error occurred', err);

            setError('An unknown error occurred');
        }

        setLoading(false);
    }
};

const useGetProducts = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null | string>(null);
    const [products, setProducts] = useState<ProductCardProps[]>([]);

    useEffect(() => {
        getProducts({
            setProducts,
            setLoading,
            setError,
        });
    }, []);

    return {
        loading,
        error,
        products,
    };
};

export default useGetProducts;
