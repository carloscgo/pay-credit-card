import ProductCard, { ProductCardProps } from "../ProductCard";

export type Products = {
    products: ProductCardProps[];
}

const Products = ({ products }: Products) => {
    return (
        <div className="flex flex-wrap justify-center gap-[50px]">
            {products.map(product => (
                <ProductCard {...product} />
            ))}
        </div>
    );
};

export default Products;
