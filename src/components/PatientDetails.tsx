import { usePatientStore } from "../store";
import { toast } from "react-toastify";
import { Patient } from "../types";
import PatientDetailItem from "./PatientDetailItem";

type PatientDetailsProps = {
  patient: Patient;
};

function PatientDetails({ patient }: PatientDetailsProps) {
  const deletePatient = usePatientStore((state) => state.deletePatient);
  const getPatientById = usePatientStore((state) => state.getPatientById);

  const handleDelete = () => {
    deletePatient(patient.id);
    toast.error("Patient deleted successfully");
  };

  return (
    <section className="mx-5 my-10 px-5 py-10 bg-white shadow-md rounded-xl">
      <PatientDetailItem label="ID" data={patient.id} />
      <PatientDetailItem label="Name" data={patient.name} />
      <PatientDetailItem label="Owner" data={patient.owner} />
      <PatientDetailItem label="Email" data={patient.email} />
      <PatientDetailItem label="Date" data={patient.date.toString()} />
      <PatientDetailItem label="Symptoms" data={patient.symptoms} />
      <div className="flex flex-col md:flex-row justify-between gap-3 mt-10">
        <button
          onClick={() => getPatientById(patient.id)}
          type="button"
          className="py-2 px-10 bg-indigo-600 hover:bg-indigo-800 duration-300 text-white font-bold uppercase rounded-lg"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          type="button"
          className="py-2 px-10 bg-red-600 hover:bg-red-800 duration-300 text-white font-bold uppercase rounded-lg"
        >
          Delete
        </button>
      </div>
    </section>
  );
}

export default PatientDetails;
