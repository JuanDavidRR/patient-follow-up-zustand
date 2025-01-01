//npm i react-toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PatientForm from "./components/PatientForm";
import PatientsList from "./components/PatientsList";

function App() {
  return (
    <>
      <section className="container mx-auto mt-20">
        <h1 className="font-black text-5xl text-center md:w-2/3 md:mx-auto">
          Patient follow-up <span className="text-indigo-700">VET</span>
        </h1>

        <section className="mt-12 md:flex justify-between">
          <PatientForm />
          <PatientsList />
        </section>
      </section>

      <ToastContainer />
    </>
  );
}

export default App;
