import { Component, OnInit } from '@angular/core';
import { Task } from '../task.model';

import { AppState } from '../store/app-state.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {LoadTodoAction, DeleteTodoAction, UpdateTodoAction} from '../store/todo.actions'

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  loading$: Observable<Boolean>;
  error$: Observable<Error>;
  tasks: Observable<Task[]>;
  
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.tasks = this.store.select(store => store.todo.list)
    this.loading$ = this.store.select(store => store.todo.loading)
    this.error$ = this.store.select(store => store.todo.error)

    this.store.dispatch(new LoadTodoAction())
  }
  
  completedtask(todo: Task) {
    let update_todo: Task = Object.assign( {} , todo)
    if(update_todo.completed_status === false){
      update_todo.completed_status = true;
      update_todo.priority = update_todo.priority * -1 
    } else {
      update_todo.completed_status = false;
      update_todo.priority = update_todo.priority * -1
    }
    this.store.dispatch(new UpdateTodoAction(update_todo))
  }

  deletetask(id: string) {
    this.store.dispatch(new DeleteTodoAction(id))
  }

}
