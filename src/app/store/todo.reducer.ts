import { Task } from "../task.model";
import { TodoAction, TodoActionTypes } from "./todo.actions"

export interface TodoState {
    list:Task[],
    loading: boolean,
    error: Error
}

const initialState: TodoState = {
    list: [],
    loading: false,
    error: undefined
}

export function TodoReducer(state: TodoState = initialState, action:TodoAction){
    switch (action.type){
        //load
        case TodoActionTypes.LOAD_TODO:
            return {
                ...state,
                loading: true
            }
        case TodoActionTypes.LOAD_TODO_SUCCESS:
            return {
                ...state,
                list:action.payload,
                loading:false,
            }
        case TodoActionTypes.LOAD_TODO_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false  
            }

        //Add    
        case TodoActionTypes.ADD_TODO:
            return {
                ...state,
                loading: true
            }
        case TodoActionTypes.ADD_TODO_SUCCESS:
            return {
                ...state,
                list:[...state.list, action.payload],
                loading:false,
            }
        case TodoActionTypes.ADD_TODO_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false  
            }

        //update
        case TodoActionTypes.UPDATE_TODO:
            return {
                ...state,
                loading: true
            }
        case TodoActionTypes.UPDATE_TODO_SUCCESS:
            let newlist= state.list.filter(item => item.id !== action.payload.id)
            newlist.push(action.payload)
            return {
                ...state,
                list: newlist,
                loading:false,
            }
        case TodoActionTypes.UPDATE_TODO_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false  
            }
    
        //Delete
        case TodoActionTypes.DELETE_TODO:
            return {
                ...state,
                loading: true
            }
        case TodoActionTypes.DELETE_TODO_SUCCESS:
            return {
                ...state,
                list:state.list.filter(item => item.id !== action.payload),
                loading:false,
            }
        case TodoActionTypes.DELETE_TODO_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false  
            };    
        default:
            return state;
    }
}