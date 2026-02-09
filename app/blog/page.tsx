import Navbar from "@/sections/Navbar";
import Blog from "@/sections/Blog";
import Footer from "@/sections/Footer";

export const metadata = {
  title: "Blog - Veluna Coffee & Lounge",
  description: "Veluna Coffee & Lounge haberleri ve yazıları.",
};

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main>
        <Blog />
      </main>
      <Footer />
    </>
  );
}
