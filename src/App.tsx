import Header from "./components/Header.tsx";
import HabbitForm from "./components/HabbitForm.tsx";
import HabbitList from "./components/HabbitList.tsx";
// import HabbitItem from "./components/HabbitItem.tsx";

export default function App() {
  return (
    <div className="max-w-2xl mx-auto p-4 flex flex-col gap-4">
      <Header />
      <HabbitForm />
      <HabbitList />
      {/* <HabbitItem /> */}
    </div>
  );
}

// header
// form
// list
