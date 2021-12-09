import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ValueChangesService {
  private menuValues = new BehaviorSubject<string>('');
  menuValueChanges = this.menuValues.asObservable();

  setValues(val) {
    this.menuValues.next(val);
  }
}
