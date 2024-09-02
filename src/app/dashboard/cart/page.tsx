import { WidgetItem } from "@/components";
import { products } from "@/products/data/products";
import { ItemCard } from "@/shopping-cart/components/ItemCard";
import { cookies } from "next/headers";


export const metadata = {
 title: 'Productos en el carrito',
 description: 'Productos en el carrito',
};

interface CartProductsProps {
    [id: string]: number;
}

interface ProductInCartProps {
    product: { id: string; name: string; price: number; rating: number; image: string;}
    quantity: number;
}

const getProductsInCart = (cart: CartProductsProps): ProductInCartProps[] => {
  const productsInCart = Object.keys(cart);
  const fullProudctsInCart:ProductInCartProps[] = [];
  productsInCart.forEach(prod => {
    const quantity = cart[prod];
    const product = products.find(product => product.id === prod);
    if(product)
        fullProudctsInCart.push({product, quantity});
  })
  return fullProudctsInCart;
}

export default function CartPage() {
  
  const cookie = cookies();
  const cookieCart = JSON.parse(cookie.get('shopping-cart')?.value || '{}') as CartProductsProps;
  const productsInCart = getProductsInCart(cookieCart);
  const totalToPay = productsInCart.reduce((acc, {product, quantity}) => acc + product.price * quantity, 0).toFixed(2)


  return (
    <div>
      <h1 className="text-5xl">Productos en el carrito</h1>
      <hr className="m-2" />
      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <div className="flex flex-col gap-2 w-full sm:w-8/12">
            {
                productsInCart.map(({product, quantity}) => (
                    <ItemCard key={product.id} product={product} quantity={quantity} />
                ))
            }
        </div>
        <div className="flex justify-center flex-col items-center ml-4">
            <WidgetItem title="Total a Pagar">
                <span className="text-2xl font-semibold">
                    ${(+totalToPay*1.15).toFixed(2)}
                </span>
                <span className="block text-center text-gray-500">Impuestos del 15%: { (+totalToPay * 0.15).toFixed(2) } </span>
            </WidgetItem>
        </div>
      </div>
    </div>
  );
}