import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import ProductList from "@/components/ProductList";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <main>
      <Suspense fallback={<div>Loading products...</div>}>
        <ProductList />
      </Suspense>
    </main>
  );
}
