export const SkeletonBlock = ({ height = '24px', width = '100%', className = '' }) => (
    <div
        className={`bg-gray-300 animate-pulse rounded ${className}`}
        style={{ height, width }}
    />
);
