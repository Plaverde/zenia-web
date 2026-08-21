export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-ivory">
      <div
        className="h-10 w-10 rounded-full border-4 border-sand border-t-sage-dark animate-spin"
        role="status"
        aria-label="Cargando"
      />
    </div>
  );
}
