import ProductCard, { ProductCardProps } from "../ProductCard";

export type ProductsProps = {
    products: ProductCardProps[];
}

const Products = ({ products }: ProductsProps) => {
    return (
        <div className="flex flex-wrap justify-center gap-[50px]">
            {products.map(product => (
                <ProductCard {...product} />
            ))}
        </div>
    );
};

export default Products;
