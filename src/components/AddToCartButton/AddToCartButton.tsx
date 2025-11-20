import type { ReactNode } from "react";

function AddToCartForm({ children }: { children: ReactNode }) {
  return <form>{children}</form>;
}

export default function AddToCartButton() {
  return (
    <AddToCartForm>
      <button
        type="submit"
        className="bg-primary text-primary-foreground px-6 py-3 w-full"
      >
        Add to Cart
      </button>
    </AddToCartForm>
  );
}
