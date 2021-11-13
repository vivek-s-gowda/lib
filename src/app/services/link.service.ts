import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import User from '../model/data.model';

@Injectable({
  providedIn: 'root',
})
export class LinkService {
  private dbPath = '/users';
  user: AngularFireList<User>;
  constructor(private fireBase: AngularFireDatabase) {
    this.user = fireBase.list(this.dbPath);
  }

  getBookingList() {
    console.log(this.fireBase.list('users'));
  }

  getAll(): AngularFireList<User> {
    return this.user;
  }

  create(data: User): any {
    return this.user.push(data);
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
