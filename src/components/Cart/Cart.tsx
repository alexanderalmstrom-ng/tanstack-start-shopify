import { useSessionContext } from "@/lib/session.context";

export default function Cart() {
  const { cart } = useSessionContext();

  return (
    <div>
      <h1>Cart</h1>
      <p>Cart ID: {cart?.id}</p>
    </div>
  );
}
