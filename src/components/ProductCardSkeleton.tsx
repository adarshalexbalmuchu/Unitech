const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 animate-pulse">
      {/* Image Skeleton */}
      <div className="relative bg-gray-100 p-6 aspect-square">
        <div className="w-full h-full bg-gray-200 rounded-lg"></div>
      </div>

      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-3 h-3 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="w-8 h-3 bg-gray-200 rounded"></div>
        </div>

        {/* Category Badge */}
        <div className="w-24 h-5 bg-gray-200 rounded-full"></div>

        {/* Name */}
        <div className="space-y-2">
          <div className="w-full h-4 bg-gray-200 rounded"></div>
          <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <div className="w-20 h-6 bg-gray-200 rounded"></div>
          <div className="w-16 h-4 bg-gray-200 rounded"></div>
        </div>

        {/* Button */}
        <div className="w-full h-12 bg-gray-200 rounded-xl"></div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
