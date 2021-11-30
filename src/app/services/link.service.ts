import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import User from '../model/data.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class LinkService {
  private dbPath = '/users';
  user: AngularFireList<User>;
  constructor(
    private fireBase: AngularFireDatabase,
    private firestore: AngularFirestore
  ) {
    this.user = fireBase.list(this.dbPath);
  }

  getBookingList() {
    console.log(this.fireBase.list('users'));
  }

  getAll(): AngularFireList<User> {
    return this.user;
  }

  create(id: string, data: User): any {
    return this.user.set(id, data);
  }

  getUser(id: string) {
    this.firestore
      .collection('users')
      .get()
      .subscribe((ss) => {
        console.log(ss)
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
