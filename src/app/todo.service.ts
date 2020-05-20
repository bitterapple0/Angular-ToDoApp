import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Task } from './task.model';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private taskcollection: AngularFirestoreCollection<Task>;
  private taskDoc: AngularFirestoreDocument<Task>;
  tasks: Observable<Task[]>;

  constructor(public firestore: AngularFirestore) { 
    this.taskcollection = this.firestore.collection<Task>('Tasks', ref => ref.orderBy('priority', 'desc'))
    this.tasks = this.taskcollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Task;
        const id = a.payload.doc.id;
        return {...data, id: id};
      }))
    )
     
  }

  getTasks() {
    return this.tasks;
  }

  createTask(task: Task) {
    return of(this.taskcollection.add(task))
  }

  updateTask(task: Task) {
    this.taskDoc = this.firestore.doc<Task>("Tasks/" + task.id)
    const task_noId= Object.assign({}, task);
    delete task_noId.id
    return of(this.taskDoc.update(task_noId))
  }

  deleteTask(taskId: string) {
    this.taskDoc = this.firestore.doc<Task>("Tasks/" + taskId)
    return of(this.taskDoc.delete())
    
  }
}
