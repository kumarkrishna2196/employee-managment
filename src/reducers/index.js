import { getDefaultNormalizer } from "@testing-library/react";
import { ACTION_TYPES } from "../constants/ActionTypes";

let initialEmployees = [];

const setEmployeesToLocal = (employees) => {
    localStorage.setItem("INITIAL_EMPLOYEES", JSON.stringify(employees));
}
const getEmployeesFromLocal = () => {
    return JSON.parse(localStorage.getItem("INITIAL_EMPLOYEES"))
}


// if(localStorage.getItem("INITIAL_EMPLOYEES") === "undefined") {
//     setEmployeesToLocal(initialEmployees);
// } else {
//     initialEmployees = getEmployeesFromLocal();
// }

const initialState = {
    employees: initialEmployees
};

const RootReducer = (state = initialState, action) => {
    switch(action.type) {
        case ACTION_TYPES.ADD_EMPLOYEE: 
            const newEmployees = [...state.employees, action.payload];
            setEmployeesToLocal(newEmployees);
            return {
                ...state,
                employees: newEmployees
            }
        case ACTION_TYPES.REMOVE_EMPLOYEE: 
            const updatedRemovedEmployees = state.employees.filter((employee) => employee.id !== action.payload.id);
            setEmployeesToLocal(updatedRemovedEmployees);

            return {
                ...state,
                employees: updatedRemovedEmployees
            }
        case ACTION_TYPES.UPDATE_EMPLOYEE: 
        const updatedEmployees = state.employees.map((employee) => {
            if(employee.id === action.payload.id) {
                return action.payload
            }
            return employee
        });
        setEmployeesToLocal(updatedEmployees);

            return {
                ...state,
                employees: updatedEmployees
            }
        default: return state;
    }
};

export default RootReducer;