import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Task } from './task';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { database } from 'firebase';

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
        return {id,...data};
      }))
    )
     
  }

  getTasks() {
    return this.tasks;
  }

  createTasks(task: Task) {
    this.taskcollection.add(task)
  }

  updateTask(taskId) {
    this.taskDoc = this.firestore.doc<Task>("Tasks/" + taskId.id)
    delete taskId.id;
    this.taskDoc.update(taskId)
  }

  deleteTask(taskId: string) {
    this.taskDoc = this.firestore.doc<Task>("Tasks/" + taskId)
    this.taskDoc.delete()
    
  }
}
