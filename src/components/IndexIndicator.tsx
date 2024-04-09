export default function IndexIndicator({ index }: { index: number }) {
  const keys = [1, 2, 3];

  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: 3 }).map((num, j) =>
        index === j ? (
          <div key={keys[j]} className="h-2 w-2 rounded-full bg-cs-orange" />
        ) : (
          <div key={keys[j]} className="h-2 w-2 rounded-full bg-white/25" />
        ),
      )}
    </div>
  );
}
