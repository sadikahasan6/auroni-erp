interface ErrorUIProps {
  message: string;
  details: string;
  stack?: string;
  image?: React.ReactNode;
}

export function ErrorUI({ message, details, stack, image }: ErrorUIProps) {
  return (
    <main className="h-screen flex flex-col items-center justify-center">
      {/* If image exists, show image, otherwise show message */}
      {image ? image : (
        <h1 className="text-7xl mb-5 tracking-tight font-extrabold lg:text-9xl">{message}</h1>
      )}
      
      <p className="mb-4 text-3xl tracking-tight font-bold md:text-4xl">{details}</p>
      
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
