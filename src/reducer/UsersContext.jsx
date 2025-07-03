import { createContext, useReducer, useContext } from "react";

const UsersContext = createContext();

const ACTIONS = {
  ADD: "add",
  UPDATE: "update",
  ACTIVATE: "activate",
  DEACTIVATE: "deactivate",
  DELETE: "delete",
};

const usersReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD:
      return [...state, action.payload];
    case ACTIONS.UPDATE:
      return state.map(user =>
        user.id === action.payload.id ? { ...user, ...action.payload } : user
      );
    case ACTIONS.ACTIVATE:
      return state.map(user =>
        user.id === action.payload.id ? { ...user, active: true } : user
      );
    case ACTIONS.DEACTIVATE:
      return state.map(user =>
        user.id === action.payload.id ? { ...user, active: false } : user
      );
    case ACTIONS.DELETE:
      return state.filter(user => user.id !== action.payload.id);
    default:
      return state;
  }
};

const initialUsers = [
  { id: 1, name: "Mario Rossi", email: "mario.rossi@example.com", active: true },
  { id: 2, name: "Giulia Bianchi", email: "giulia.bianchi@example.com", active: false },
  { id: 3, name: "Luca Verdi", email: "luca.verdi@example.com", active: true },
];

export const UsersProvider = ({ children }) => {
  const [users, dispatch] = useReducer(usersReducer, initialUsers);

  return (
    <UsersContext.Provider value={{ users, dispatch }}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("useUsers deve essere usato all'interno di <UsersProvider>");
  }
  return context;
};

export const USERS_ACTIONS = ACTIONS;
