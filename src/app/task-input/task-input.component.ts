import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { Task } from '../task';

@Component({
  selector: 'app-task-input',
  templateUrl: './task-input.component.html',
  styleUrls: ['./task-input.component.css']
})
export class TaskInputComponent implements OnInit {
  todo: Task = {
    task: '',
    priority: 0,
    completed_status: false
  }

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
  }
  onSubmit($e){
    if(this.todo.task != '' && this.todo.priority !=0){
    this.todoService.createTasks(this.todo);
    this.todo.task='';
    this.todo.priority=0;
  }}
}
