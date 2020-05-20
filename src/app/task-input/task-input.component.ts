import { Component, OnInit } from '@angular/core';
import { Task } from '../task.model';
//ngrx stuff
import { AppState } from '../store/app-state.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {AddTodoAction} from '../store/todo.actions'
@Component({
  selector: 'app-task-input',
  templateUrl: './task-input.component.html',
  styleUrls: ['./task-input.component.css']
})
export class TaskInputComponent implements OnInit {
   loading$: Observable<Boolean>;
   error$: Observable<Error>;
   todo: Task = {
    task: '',
    priority: 0,
    completed_status: false
  }

  constructor(private store: Store <AppState>) { }

  ngOnInit(): void {
    this.loading$ = this.store.select(store => store.todo.loading)
    this.error$ = this.store.select(store => store.todo.error)
  }
  onSubmit($e){
    if(this.todo.task != '' && this.todo.priority !=0){
    this.store.dispatch(new AddTodoAction(this.todo));
    this.todo={
      task: '',
      priority: 0,
      completed_status: false
    }
  }}
}
