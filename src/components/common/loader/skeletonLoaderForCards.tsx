export const CardSkeletonLoader = () => {
  const skeletonItems = Array.from({ length: 10 });

  return (
     <div className="p-4 ">
      <div className="grid place-items-center sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {skeletonItems.map((_, index) => (
          <div
            key={index}
            className="w-full max-w-[200px] h-[300px] rounded-xl shadow-xl p-2 bg-white select-none flex flex-col gap-4 animate-pulse"
          >
            {/* Image placeholder */}
            <div className="bg-gray-200 h-[150px] w-full rounded-md" />

            {/* Title placeholder */}
            <div className="bg-gray-200 h-4 w-3/4 rounded" />

            {/* Subtext placeholder */}
            <div className="bg-gray-200 h-3 w-1/2 rounded" />

            {/* Price placeholders */}
            <div className="flex gap-2 mt-auto">
              <div className="bg-gray-200 h-4 w-1/3 rounded" />
              <div className="bg-gray-300 h-4 w-1/4 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
