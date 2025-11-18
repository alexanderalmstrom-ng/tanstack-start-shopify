import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ProductList from "@/components/ProductList";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <main>
      <ErrorBoundary fallback={<div>Error loading products</div>}>
        <Suspense fallback={<div>Loading products...</div>}>
          <ProductList />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}
