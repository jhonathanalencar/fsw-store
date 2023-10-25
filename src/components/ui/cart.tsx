import { useContext } from "react";
import { ShoppingCartIcon } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";

import { createCheckout } from "@/actions/checkout";

import { Badge } from "./badge";
import { CartContext } from "@/providers/cart";
import { CartItem } from "./cart-item";
import { Separator } from "./separator";
import { ScrollArea } from "./scroll-area";
import { Button } from "./button";
import { useSession } from "next-auth/react";
import { createOrder } from "@/actions/order";

export const Cart = () => {
  const { data } = useSession();

  const { products, cartBasePrice, cartTotalDiscount, cartTotalPrice } =
    useContext(CartContext);

  const handleFinishPurchaseClick = async () => {
    if (!data?.user) {
      return;
    }

    const order = await createOrder(products, data.user.id);

    const checkoutStringfy = await createCheckout(products, order.id);
    const checkout = JSON.parse(checkoutStringfy);
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

    stripe?.redirectToCheckout({
      sessionId: checkout.id,
    });
  };

  return (
    <div className="flex h-full flex-col gap-8">
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
        variant="outline"
      >
        <ShoppingCartIcon size={16} />
        Carrinho
      </Badge>

      <div className="flex flex-1 flex-col gap-5 overflow-hidden">
        <ScrollArea className="h-full">
          {products.length > 0 ? (
            products.map((product) => (
              <CartItem key={product.id} product={product} />
            ))
          ) : (
            <p className="text-center font-semibold">
              Carrinho vazio. Vamos fazer compras?
            </p>
          )}
        </ScrollArea>
      </div>

      {products.length > 0 && (
        <div className="flex flex-col gap-3">
          <Separator />

          <div className="flex items-center justify-between text-xs">
            <p>Subtotal</p>
            <p>R$ {cartBasePrice.toFixed(2)}</p>
          </div>

          <Separator />

          <div className="flex items-center justify-between text-xs">
            <p>Entrega</p>
            <p>GRÁTIS</p>
          </div>

          <Separator />

          <div className="flex items-center justify-between text-xs">
            <p>Descontos</p>
            <p>- R$ {cartTotalDiscount.toFixed(2)}</p>
          </div>

          <Separator />

          <div className="flex items-center justify-between text-sm font-bold">
            <p>Total</p>
            <p>R$ {cartTotalPrice.toFixed(2)}</p>
          </div>

          <Button
            className="mt-7 font-bold uppercase"
            onClick={handleFinishPurchaseClick}
          >
            Finalizar compra
          </Button>
        </div>
      )}
    </div>
  );
};
