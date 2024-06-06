import Footer from "./components/Footer/Footer";
import Hero from "./components/Hero/Hero";
import Items from "./components/Items/Items";

function App() {
  return (
    <div>
      <div className="h-[90vh] md:h-[65vh] lg:h-[90vh]">
        <Hero />
      </div>
      <div className="h-fit">
        <Items />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
