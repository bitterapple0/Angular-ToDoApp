import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Task } from './task.model';
import { Observable, of } from 'rxjs';
import { map,delay } from 'rxjs/operators';


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
    return this.tasks.pipe(delay(1000));
  }

  createTask(task: Task) {
    const ID = this.firestore.createId();
    const task_id = {id: ID, ...task} 
    return of(this.taskcollection.doc(ID).set(task_id)).pipe(delay(1000))
  }

  updateTask(task: Task) {
    this.taskDoc = this.firestore.doc<Task>("Tasks/" + task.id)
    //const task_noId= Object.assign({}, task);
    //delete task_noId.id
    return of(this.taskDoc.update({
      completed_status: task.completed_status,
      priority: task.priority
    })).pipe(delay(1000))
  }

  deleteTask(taskId: string) {
    this.taskDoc = this.firestore.doc<Task>("Tasks/" + taskId)
    return of(this.taskDoc.delete()).pipe(delay(1000))
    
  }
}
