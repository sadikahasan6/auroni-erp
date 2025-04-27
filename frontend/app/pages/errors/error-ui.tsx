import { useNavigate } from 'react-router-dom';

interface ErrorUIProps {
  message: string;
  details: string;
  stack?: string;
  image?: React.ReactNode;
}

export function ErrorUI({ message, details, stack, image }: ErrorUIProps) {
  const navigate = useNavigate();

  return (
    <main className="h-screen flex flex-col items-center justify-center px-4">
      {/* If image exists, show image, otherwise show message */}
      {image ? (
        image
      ) : (
        <h1 className="text-7xl mb-5 tracking-tight font-extrabold lg:text-9xl text-gray-900">
          {message}
        </h1>
      )}
      
      <p className="mb-6 text-3xl text-center tracking-tight font-bold text-gray-700 md:text-4xl">
        {details}
      </p>
      
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-200"
        >
          Go Back
        </button>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition-colors duration-200"
        >
          Go Home
        </button>
      </div>
      
      {stack && (
        <pre className="w-full max-w-3xl p-4 bg-gray-100 rounded-lg overflow-x-auto text-sm text-gray-800">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}