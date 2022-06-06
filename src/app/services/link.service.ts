import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import User from '../model/data.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getDatabase, ref, onValue, get, child, set } from 'firebase/database';
import { Subject } from 'rxjs';
import { HttpClient } from "@angular/common/http"

@Injectable({
  providedIn: 'root',
})
export class LinkService {
  private dbPath = '/users';
  subject$ = new Subject();
  numberExists$ = new Subject();
  user: AngularFireList<User>;
  db:any;
  constructor(
    private fireBase: AngularFireDatabase,
    private firestore: AngularFirestore,
    private http: HttpClient

  ) {
    this.user = fireBase.list(this.dbPath);
    
    //  this.db = fireBase.database();
  }

  getAll(): AngularFireList<User> {
    return this.user;
  }

  create(id: string, data: User): any {
    return this.user.set(id, data);
  }

  getUser(id: string) {
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

  update(key: string, value: User) {
    // return this.user.update(key, value);
    const dbRef = ref(getDatabase());
    set(child(dbRef, `users/${key}`), value)
      .then(() => {
      })
      .catch((error) => {});
  }

  delete(key: string): Promise<void> {
    return this.user.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.user.remove();
  }

  verifyNumber(value: string) {
    this.fireBase.list('/users', ref => ref.orderByChild('phoneNumber').equalTo(value.toString())).snapshotChanges().subscribe((res) => {
     res.length > 0 ? this.numberExists$.next(true) : this.numberExists$.next(false);
    })
  }

  getCountryCodes() {
    return this.http.get("https://country-code-api.herokuapp.com/AllCountries");
  }
}
