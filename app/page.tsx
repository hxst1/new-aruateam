// app/page.tsx
import StoreLayout from "./(store)/layout";
import StoreHome from "./(store)/page";

export default function RootPage() {
  return (
    <StoreLayout>
      <StoreHome />
    </StoreLayout>
  );
}
