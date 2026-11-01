import Header from "./components/Header";
import SectionOne from "./components/SectionOne";

export default function App() {
  return (
    <div className="w-150 h-[190vh] md:h-dvh lg:h-dvh md:w-full lg:w-full bg-red-800 p-10 font-semibold">
      <Header />
      <SectionOne />
    </div>
  );
}
