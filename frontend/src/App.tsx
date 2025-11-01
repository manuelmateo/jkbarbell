import { NavBar } from "./components/NavBar";

const MainHomeContent = () => {
  return (
    <>
      <div class="container-fluid">
        <hgroup>
          <h1 style="color: #687899;">JK Barbell</h1>
        </hgroup>
        <blockquote>
          "BITCH ID RATHER DIE"
          <footer>
            <cite>- Skolla</cite>
          </footer>
        </blockquote>
      </div>
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
