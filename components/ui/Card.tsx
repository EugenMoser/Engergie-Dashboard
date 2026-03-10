interface CardProps {
  children: React.ReactNode;
  className?: string;
}
export default function Card({
  children,
  className,
}: CardProps): React.JSX.Element {
  return (
    <div
      className={`flex flex-col items-start m-4 p-4 gap-8 rounded-lg shadow-md ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
