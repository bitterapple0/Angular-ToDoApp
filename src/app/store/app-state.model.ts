import { Task } from '../task.model';
import { TodoState } from './todo.reducer';

export interface AppState {
    readonly todo: TodoState; 
}