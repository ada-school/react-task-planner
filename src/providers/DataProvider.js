import React, { useState } from "react";

export const tasks = [
  {
    id: "1",
    isCompleted: false,
    name: "Arreglar el checklist del edit",
    description:"arreglado pa",
    assignedTo:"novenix",
    dueDate:"20-feb-2021",
    status:"TODO"
  },
  {
    id: "2",
    isCompleted: false,
    name: "Limpiar el campo del create task cuando se crea tarea",
    description:"limpiarlo bien",
    assignedTo:"Daniela",
    dueDate:"21-feb-2021",
    status:"IN_PROGRESS"
  },
  {
    id: "3",
    isCompleted: false,
    name: "Mejorar el UI usando CSS",
    description:"Hola",
    assignedTo:"Novenix",
    dueDate:"21-12-2022",
    status:"REVIEW"
  },
  {
    id: "4",
    isCompleted: false,
    name: "Modificar la estructura del proyecto(UI y lógica) para que el Task tenga los siguientes campos: [name, description,assignedTo, dueDate, [status(TODO, IN_PROGRESS,REVIEW, DONE)]",
    description:"modificado paps",
    assignedTo:"Daniela",
    dueDate:"23-05-2021",
    status:"DONE"
  }
];

const initialData = { tasks };

const DataContext = React.createContext(initialData);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(initialData);

  const value = { data, setData };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = React.useContext(DataContext);

  return context;
};
