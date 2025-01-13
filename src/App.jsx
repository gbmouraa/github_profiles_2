import githubLogo from "./images/github.svg";
import { Form } from "./components/Form";
import { UserCard } from "./components/UserCard";

function App() {
  return (
    <main>
      <img src={githubLogo} alt="Github Logo" width={48} />
      <Form />
      <UserCard />
    </main>
  );
}

export default App;
