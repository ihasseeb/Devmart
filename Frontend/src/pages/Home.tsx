import Hero from "../components/Hero";
import FeaturedProducts from "../components/FeaturedProducts";

const Home = () => {
  return (
    <div className="relative overflow-hidden min-h-screen">
      {/* Background Animation Layer */}
      <div className="absolute inset-0 z-[-10] overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[30rem] h-[30rem] bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-20 right-1/4 w-[30rem] h-[30rem] bg-accent/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob" style={{ animationDelay: "2s" }}></div>
        <div className="absolute -bottom-32 left-1/3 w-[30rem] h-[30rem] bg-primary-light/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob" style={{ animationDelay: "4s" }}></div>
      </div>
      
      <Hero />
      <FeaturedProducts />
    </div>
  );
};
export default Home;
