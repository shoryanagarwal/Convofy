import Navbar from "../component/Navbar.jsx";
import Hero from "../component/Hero.jsx";
import Features from "../component/Feature.jsx";
import Showcase from "../component/Showcase.jsx";
import About from "../component/About.jsx";
import CTA from "../component/Cta.jsx";
import Footer from "../component/Footer.jsx";

const Home = () => {
  return (
    <div className="bg-[#0b0b0c] min-h-screen text-white">
      <Navbar />
      <Hero />
      <Features />
      <Showcase />
      <About />
      <CTA />
      <Footer />
    </div>
  );
};

export default Home;