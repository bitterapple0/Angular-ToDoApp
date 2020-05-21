import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap,switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { TodoService } from '../todo.service'
import { LoadTodoAction, TodoActionTypes, LoadTodoSuccessAction, LoadTodoFailureAction, AddTodoAction, AddTodoSuccessAction, AddTodoFailureAction, DeleteTodoAction, DeleteTodoSuccessAction, DeleteTodoFailureAction, UpdateTodoAction, UpdateTodoSuccessAction, UpdateTodoFailureAction } from './todo.actions';

@Injectable()
export class TodoEffects{
    constructor( 
        private actions$: Actions,
        private todoService: TodoService,    
    ){}

    @Effect() loadTodo$ = this.actions$
    .pipe(
        ofType<LoadTodoAction>(TodoActionTypes.LOAD_TODO),
        mergeMap(
            ()=> this.todoService.getTasks()
            .pipe(
                map(data => {
                    return new LoadTodoSuccessAction(data)
                }),
                catchError(error => of(new LoadTodoFailureAction(error)))
            )
        )
    )

    @Effect() addTodo$ = this.actions$
    .pipe(
        ofType<AddTodoAction>(TodoActionTypes.ADD_TODO),
        switchMap(
            (data)=> this.todoService.createTask(data.payload)
            .pipe(
                map(() => {
                    return new AddTodoSuccessAction(data.payload)
                }),
                catchError(error => of(new AddTodoFailureAction(error)))
            )
        )
    )

    @Effect() updateTodo$ = this.actions$
    .pipe(
        ofType<UpdateTodoAction>(TodoActionTypes.UPDATE_TODO),
        mergeMap(
            (data)=> this.todoService.updateTask(data.payload)
            .pipe(
                map(() => {
                    return new UpdateTodoSuccessAction(data.payload)
                }),
                catchError(error => of(new UpdateTodoFailureAction(error)))
            )
        )
    )

    @Effect() deleteTodo$ = this.actions$
    .pipe(
        ofType<DeleteTodoAction>(TodoActionTypes.DELETE_TODO),
        mergeMap(
            (data)=> this.todoService.deleteTask(data.payload)
            .pipe(
                map(() => {
                    return new DeleteTodoSuccessAction(data.payload)
                }),
                catchError(error => of(new DeleteTodoFailureAction(error)))
            )
        )
    )
}

 
