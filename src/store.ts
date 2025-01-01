// npm i zustand
import { create } from "zustand";
//dependency for redux devtools and zustand and persist to keep the state after refreshing the page
import { devtools, persist } from "zustand/middleware";
//npm i uuid
//npm i --save-dev @types/uuid
import { v4 as uuidv4 } from "uuid";
import { DraftPatient, Patient } from "./types/index";

//types
type PatientState = {
  patients: Patient[];
  activeId: Patient["id"];

  //Actions
  //Hover over DraftPatient on Patient Form.jsx to see the type
  addPatient: (data: DraftPatient) => void;
  deletePatient: (id: Patient["id"]) => void;
  getPatientById: (id: Patient["id"]) => void;
  updatePatient: (data: DraftPatient) => void;
};

//Custom functions

//Create a unique id for the patient
const createPatientId = (patient: DraftPatient): Patient => {
  return {
    //Create a copy of the patient
    ...patient,
    //and add the id using uuid
    id: uuidv4(),
  };
};

// Zustand store // Creación del store usando Zustand y habilitando Redux DevTools
export const usePatientStore = create<PatientState>()(
  devtools(
    //Devtools to show the state on redux tools
    persist(
      //Persist to keep the state after refreshing the page
      (set) => ({
        //Initial states
        patients: [],
        activeId: "",

        //Actions
        // Action to add a patient
        addPatient: (data) => {
          const newPatient = createPatientId(data); // Create a new patient with the form data and assign an id
          set((state) => ({
            //adding the patient to the store
            patients: [...state.patients, newPatient],
          }));
        },

        // Action to delete the patient by its id
        deletePatient: (id) => {
          set((state) => ({
            patients: state.patients.filter((patient) => patient.id !== id),
          }));
        },

        // Action to get the patient by its id
        getPatientById: (id) => {
          set(() => ({
            activeId: id,
          }));
        },

        updatePatient: (data) => {
          set((state) => ({
            // Map through the patients
            patients: state.patients.map((patient) =>
              // Find the patient with the same id as the activeId
              patient.id === state.activeId
                ? // If the patient is found, update the patient with the data
                  { id: state.activeId, ...data }
                : // Otherwise, return the patient as it is
                  patient
            ),
            // Reset the activeId
            activeId: "",
          }));
        },
      }),
      // Persist storage
      { name: "PatientStorage" }
    )
  )
);
