import { createFileRoute } from "@tanstack/react-router";
import ProductList from "@/components/ProductList/ProductList";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <main>
      <ProductList />
    </main>
  );
}
