
const CircleLoader = ({ size = 16 }) => (
  <div className="flex justify-center items-center">
    <div
      style={{ width: `${size*4}px`, height: `${size*4}px` }}
      className="w-16 h-16 border-6 border-blue-500 border-t-transparent rounded-full animate-spin"
    ></div>
  </div>
);

export default CircleLoader;
