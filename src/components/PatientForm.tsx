//npm i react-hook-form
import { useForm } from "react-hook-form";
import Error from "./Error";
import { DraftPatient } from "../types";
import { usePatientStore } from "../store";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function PatientForm() {
  //Import the actions from the store
  const addPatient = usePatientStore((state) => state.addPatient);
  const updatePatient = usePatientStore((state) => state.updatePatient);

  const activeId = usePatientStore((state) => state.activeId);
  const patients = usePatientStore((state) => state.patients);

  //Methods from react-hook-form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<DraftPatient>();

  //Getting the form information if the getPatinetById is called
  useEffect(() => {
    if (activeId) {
      //Get the patient whose id is the same id as getPatientById
      const activePatient = patients.filter(
        (patient) => patient.id === activeId
      )[0];
      //Recover the data from the selected patient
      setValue("name", activePatient.name);
      setValue("owner", activePatient.owner);
      setValue("email", activePatient.email);
      setValue("date", activePatient.date);
      setValue("symptoms", activePatient.symptoms);
    }
  }, [patients, activeId, setValue]);

  //Function from react-hook-form to register the data
  const registerPatient = (data: DraftPatient) => {
    //If the activeId exists, updat the patient
    if (activeId) {
      updatePatient(data);
      toast.info("Patient updated successfully");
    } else {
      //Adding the patient to the store through an action
      addPatient(data);
      toast.success("Patient added successfully");
    }

    //using reset action from react-hook-form
    reset();
  };

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

      <p className="text-lg mt-5 text-center mb-10">
        Add patients and{" "}
        <span className="text-indigo-600 font-bold">Manage them</span>
      </p>

      <form
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10 space-y-5"
        onSubmit={handleSubmit(registerPatient)}
      >
        <div className="mb-5 space-y-3">
          <label htmlFor="name" className="text-sm uppercase font-extrabold">
            Patient
          </label>
          <input
            id="name"
            className="w-full p-3  border border-gray-400"
            type="text"
            placeholder="Patient name"
            //Using react hook form to register the input
            {...register("name", {
              required: "Patient name is required",
            })}
          />

          {errors.name && <Error>{errors.name?.message}</Error>}
        </div>

        <div className="mb-5 space-y-3">
          <label
            htmlFor="caretaker"
            className="text-sm uppercase font-extrabold"
          >
            Owner
          </label>
          <input
            id="caretaker"
            className="w-full p-3  border border-gray-400"
            type="text"
            placeholder="Owner's name"
            //Using react hook form to register the input
            {...register("owner", {
              required: "Owner name is required",
            })}
          />
          {errors.owner && <Error>{errors.owner?.message}</Error>}
        </div>

        <div className="mb-5 space-y-3">
          <label htmlFor="email" className="text-sm uppercase font-extrabold">
            Email
          </label>
          <input
            id="email"
            className="w-full p-3  border border-gray-400"
            type="email"
            placeholder="Regestry email"
            //Using react hook form to register the input
            {...register("email", {
              required: "El Email es Obligatorio",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email",
              },
            })}
          />
          {errors.email && <Error>{errors.email?.message}</Error>}
        </div>

        <div className="mb-5 space-y-3">
          <label htmlFor="date" className="text-sm uppercase font-extrabold">
            Discharge date
          </label>
          <input
            id="date"
            className="w-full p-3  border border-gray-400"
            type="date"
            {...register("date", {
              required: "Date is required",
            })}
          />
          {errors.date && <Error>{errors.date?.message}</Error>}
        </div>

        <div className="mb-5 space-y-3">
          <label
            htmlFor="symptoms"
            className="text-sm uppercase font-extrabold"
          >
            Symptoms
          </label>
          <textarea
            id="symptoms"
            className="w-full p-3  border border-gray-400"
            placeholder="Patient Symptoms"
            {...register("symptoms", {
              required: "Symptoms are required",
            })}
          ></textarea>
          {errors.symptoms && <Error>{errors.symptoms?.message}</Error>}
        </div>

        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-extrabold hover:bg-indigo-700 cursor-pointer transition-colors"
          value="Save patient"
        />
      </form>
    </div>
  );
}
