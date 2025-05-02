export default function HeroSection() {
    return (
      <div className="bg-[url(/home.jpg)] min-h-130 bg-cover flex items-end justify-center">
        <div className="bg-amber-950/50 p-7 mx-5 mt-10 mb-5 md:mb-10 rounded-lg max-w-lg sm:max-w-xl md:max-w-2xl text-center">
          <div className="text-white md:text-5xl text-3xl font-bold">
            ERP: Powering Progress. Simplifying Business.
          </div>
          <p className="text-white py-4 max-md:text-sm">
            ERP unifies your business — automating tasks, streamlining operations,
            and delivering real-time insights. It breaks down silos, boosts efficiency, 
            and empowers smart decisions. More than software, ERP is your strategic 
            edge for growth, agility, and lasting success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center sm:items-start">
            <a href="#"
              className="bg-amber-950 text-white rounded-lg px-6 py-3 w-full sm:w-auto"
              aria-label="Login"
            >
              Login
            </a>
            <a href="#"
              className="bg-amber-950 text-white rounded-lg px-6 py-3 w-full sm:w-auto"
              aria-label="Register"
            >
              Register
            </a>
            <a href="#"
              className="bg-teal-950 text-white rounded-lg px-6 py-3 w-full sm:w-auto"
              aria-label="Learn more"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    );
  }
  