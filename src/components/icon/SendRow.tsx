export default function SendRow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M 45,25 l -40,20 l 0,-40 Z"
        className="fill-amber-50 group-hover:translate-x-2 transition-all duration-200 "
      />
    </svg>
  );
}
