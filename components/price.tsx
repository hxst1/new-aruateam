export default function Price({
  amount,
  currency = "EUR",
  className = "",
}: {
  amount: number;
  currency?: string;
  className?: string;
}) {
  const formatted = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency,
  }).format(amount / 100);
  return <span className={className}>{formatted}</span>;
}
