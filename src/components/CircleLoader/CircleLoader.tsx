
type Size = 'small' | 'medium' | 'large';

const sizeMap: Record<Size, string> = {
  small: 'w-8 h-8',
  medium: 'w-12 h-12',
  large: 'w-16 h-16',
};

interface CircleLoaderProps {
  size?: Size;
}


export const CircleLoader: React.FC<CircleLoaderProps> = ({ size = 'small' }) => (
  <div className="flex justify-center items-center">
    <div className={`${sizeMap[size]} border-6 border-blue-500 border-t-transparent rounded-full animate-spin`}></div>
  </div>
);

