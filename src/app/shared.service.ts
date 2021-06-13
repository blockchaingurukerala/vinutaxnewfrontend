import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  comp1Val: string;
  _comp1ValueBS = new BehaviorSubject<string>('');
  constructor() { 
    this.comp1Val;
    this._comp1ValueBS.next(this.comp1Val);
  }
  updateComp1Val(val) {
    this.comp1Val = val;
    this._comp1ValueBS.next(this.comp1Val);
  }
}
