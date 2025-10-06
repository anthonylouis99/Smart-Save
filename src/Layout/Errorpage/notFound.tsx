export const NotFoundPage = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-primary-main">
      <h1 className="text-9xl font-extrabold text-white tracking-widest">
        404
      </h1>
      <div className="bg-green-500 px-2 text-sm rounded rotate-6 absolute">
        Page Not Found
      </div>
      <div className="mt-5">
        <div className="relative inline-block text-sm font-medium text-green-bg-green-500 group active:text-orange-500 focus:outline-none focus:ring">
          <span className="absolute inset-0 bg-green-500"></span>
        </div>
      </div>
    </div>
  );
};
