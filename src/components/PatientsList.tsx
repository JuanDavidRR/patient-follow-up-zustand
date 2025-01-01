import { usePatientStore } from "../store";
import PatientDetails from "./PatientDetails";

function PatientsList() {
  const patients = usePatientStore((state) => state.patients);
  return (
    <section className="md:w-1/2 lg:3/5 md:h-screen overflow-y-scroll">
      {patients.length === 0 ? (
        <div className="text-center space-y-5">
          <h2 className="font-black text-3xl">There are no patients</h2>
          <p className="text-lg">
            Add some patients and{" "}
            <span className="text-indigo-600 font-bold">
              they will be listed here.
            </span>
          </p>
        </div>
      ) : (
        <section className="space-y-5">
          <h2 className="font-black text-3xl text-center ">Patients</h2>
          <p className="text-lg text-center ">
            Manage your{" "}
            <span className="text-indigo-600 font-bold">
              patients and appointments
            </span>
          </p>
          {patients.map((patient) => (
            <PatientDetails key={patient.id} patient={patient} />
          ))}
        </section>
      )}
    </section>
  );
}

export default PatientsList;
