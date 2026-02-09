import Navbar from "@/sections/Navbar";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Testimonials from "@/sections/Testimonials";
import Services from "@/sections/Services";
import PrivateDining from "@/sections/PrivateDining";
import FeatureBanner from "@/sections/FeatureBanner";
import Blog from "@/sections/Blog";
import ReservationContact from "@/sections/ReservationContact";
import Footer from "@/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Testimonials />
        <Services />
        <PrivateDining />
        <FeatureBanner />
        <Blog />
        <ReservationContact />
        <Footer />
      </main>
    </>
  );
}
