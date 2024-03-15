export type ProductCardProps = {
    name: string,
    price: number,
    image: string,
}

const ProductCard = ({
    name,
    price,
    image,
}: ProductCardProps) => {
    return (
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow ">
            <div className="w-100 h-[300px]">
                <img className="p-8 rounded-t-lg m-auto image-product" src={image} alt={name} />
            </div>

            <div className="px-5 pb-5">
                <a href="#">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 ">
                        {name}
                    </h5>
                </a>

                <div className="flex items-center justify-between mt-4">
                    <span className="text-3xl font-bold text-gray-900 ">
                        {price}
                    </span>

                    <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                        Buy now
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
