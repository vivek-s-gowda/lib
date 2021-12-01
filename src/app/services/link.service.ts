import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import User from '../model/data.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getDatabase, ref, onValue, get, child } from 'firebase/database';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LinkService {
  private dbPath = '/users';
  subject$ = new Subject();
  user: AngularFireList<User>;
  constructor(
    private fireBase: AngularFireDatabase,
    private firestore: AngularFirestore
  ) {
    this.user = fireBase.list(this.dbPath);
  }

  getAll(): AngularFireList<User> {
    return this.user;
  }

  create(id: string, data: User): any {
    return this.user.set(id, data);
  }

  getUser(id: string) {
    // const db = getDatabase();
    // const starCountRef = ref(db, 'users/' + id);
    // onValue(starCountRef, (snapshot) => {
    //   const user = snapshot.val();
    //   console.log(user);
    //   return user;
    // });
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${id}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.subject$.next(snapshot.val());
        } else {
          console.log('No data available');
          this.subject$.next(null);
        }
      })
      .catch((error) => {
        console.error(error);
        this.subject$.next(null);
      });
  }

  update(key: string, value: any): Promise<void> {
    return this.user.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.user.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.user.remove();
  }
}
