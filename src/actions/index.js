import { ACTION_TYPES } from "../constants/ActionTypes"
import Utils from "../utils/Utils";

export const DeleteEmployee = (id) => {
    return {
        type: ACTION_TYPES.REMOVE_EMPLOYEE,
        payload: {id}
    }
}

export const AddEmployee = (employee) => {
    console.log(employee);
    return {
        type: ACTION_TYPES.ADD_EMPLOYEE,
        payload: {
            ...employee,
            id: Utils.generateEmployeeID()
        }
    }
}

export const UpdateEmployee = (employee) => {
    return {
        type: ACTION_TYPES.UPDATE_EMPLOYEE,
        payload: employee
    }
}