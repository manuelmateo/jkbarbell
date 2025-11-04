import { NavBar } from "./components/NavBar";

const MainHomeContent = () => {
  return (
    <>
      <section class="hero is-link is-fullheight-with-navbar">
        <div class="hero-body">
          <div class="container has-text-centered">
            <p class="title">JK Barbell</p>
            <p class="subtitle">All Pain No Gain</p>
            <blockquote>Bitch I'd Rather Die</blockquote>
            <cite> -Skolla (aka BIRD)</cite>
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
