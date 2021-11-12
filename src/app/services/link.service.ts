import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})

export class LinkService { 
    constructor(private fireBase: AngularFireDatabase) { }

    getBookingList() {
        console.log(this.fireBase.list("users"));
      }

} 