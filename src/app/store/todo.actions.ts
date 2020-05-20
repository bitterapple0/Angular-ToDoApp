import {Action} from '@ngrx/store'
import { Task } from '../task.model'

export enum TodoActionTypes {
    LOAD_TODO = '[TODO] Load Todo',
    LOAD_TODO_SUCCESS = '[TODO] Load Todo Success',
    LOAD_TODO_FAILURE = '[TODO] Load Todo Failure',
    
    ADD_TODO = '[TODO] Add Todo',
    ADD_TODO_SUCCESS = '[TODO] Add Todo Success',
    ADD_TODO_FAILURE = '[TODO] Add Todo Failure',

    UPDATE_TODO = '[TODO] Update Todo',
    UPDATE_TODO_SUCCESS = '[TODO] Update Todo Success',
    UPDATE_TODO_FAILURE = '[TODO] Update Todo Failure',

    DELETE_TODO = '[TODO] Delete Todo',
    DELETE_TODO_SUCCESS = '[TODO] Delete Todo Success',
    DELETE_TODO_FAILURE = '[TODO] Delete Todo Failure',
    
}
//Load
export class LoadTodoAction implements Action {
    readonly type = TodoActionTypes.LOAD_TODO;
}
export class LoadTodoSuccessAction implements Action {
    readonly type = TodoActionTypes.LOAD_TODO_SUCCESS;
    constructor(public payload: Task[]) {}
}
export class LoadTodoFailureAction implements Action {
    readonly type = TodoActionTypes.LOAD_TODO_FAILURE;
    constructor(public payload: Error) {}
}
//Add
export class AddTodoAction implements Action {
    readonly type = TodoActionTypes.ADD_TODO;
    constructor(public payload: Task) {}
}
export class AddTodoSuccessAction implements Action {
    readonly type = TodoActionTypes.ADD_TODO_SUCCESS;
    constructor(public payload: Task) {}
}
export class AddTodoFailureAction implements Action {
    readonly type = TodoActionTypes.ADD_TODO_FAILURE;
    constructor(public payload: Error) {}
}

//Update
export class UpdateTodoAction implements Action {
    readonly type = TodoActionTypes.UPDATE_TODO;
    constructor(public payload: Task) {}
}
export class UpdateTodoSuccessAction implements Action {
    readonly type = TodoActionTypes.UPDATE_TODO_SUCCESS;
    constructor(public payload: Task) {}
}
export class UpdateTodoFailureAction implements Action {
    readonly type = TodoActionTypes.UPDATE_TODO_FAILURE;
    constructor(public payload: Error) {}
}
//Delete
export class DeleteTodoAction implements Action {
    readonly type = TodoActionTypes.DELETE_TODO;
    constructor(public payload: string) {}
}
export class DeleteTodoSuccessAction implements Action {
    readonly type = TodoActionTypes.DELETE_TODO_SUCCESS;
    constructor(public payload: string) {}
}
export class DeleteTodoFailureAction implements Action {
    readonly type = TodoActionTypes.DELETE_TODO_FAILURE;
    constructor(public payload: Error) {}
}

export type TodoAction = 
LoadTodoAction|
LoadTodoSuccessAction|
LoadTodoFailureAction|
AddTodoAction|
AddTodoSuccessAction|
AddTodoFailureAction|
UpdateTodoAction|
UpdateTodoSuccessAction|
UpdateTodoFailureAction|
DeleteTodoAction|
DeleteTodoSuccessAction|
DeleteTodoFailureAction