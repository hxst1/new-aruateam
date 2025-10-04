import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { CartProvider } from "@/components/cart-context";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <div className="min-h-dvh flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </CartProvider>
  );
}
