export default function Loader() {
  return (
    <div className="relative w-16 h-16">
      <div className="absolute inset-0 border-4 border-white/20 rounded-full"></div>
      <div className="absolute inset-0 border-4 border-transparent border-t-white rounded-full animate-spin"></div>
    </div>
  );
}
