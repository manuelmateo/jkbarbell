import { NavBar } from "./components/NavBar";

const MainHomeContent = () => {
  return (
    <>
      <section class="hero is-link is-fullheight-with-navbar">
        <div class="hero-body">
          <div class="">
            <p class="title">JK Barbell</p>
            <p class="subtitle">All Pain No Gain</p>
          </div>
        </div>
      </section>
    </>
  );
};

function App() {
  return (
    <>
      <NavBar />
      <MainHomeContent />
    </>
  );
}

export default App;
