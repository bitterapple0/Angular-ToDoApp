import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { Task } from '../task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[];
  
  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService.getTasks().subscribe(tasks =>{ 
      this.tasks = tasks
    })
  }
  
  completedtask(todo) {
    const priority_num = todo.priority
    if(todo.completed_status === false){
      todo.completed_status=true
      todo.priority= priority_num * -1
      this.todoService.updateTask(todo)
    } else {
      todo.completed_status=false
      todo.priority= priority_num * -1
      this.todoService.updateTask(todo)
      
    }
  }

  deletetask(todo) {
    this.todoService.deleteTask(todo.id)
  }

}
