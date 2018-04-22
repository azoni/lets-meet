import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";


@Component({
  selector: 'app-chair',
  templateUrl: './chair.component.html',
  styleUrls: ['./chair.component.css']
})
export class ChairComponent implements OnInit {

  public bool:boolean;
  public text:string;
  public value: FirebaseListObservable<any[]>;
  constructor(db: AngularFireDatabase) {
      this.value = db.list('/', {
          preserveSnapshot: true
      });
      this.value.subscribe(keys => {
          keys.forEach(key => {
              if(key.val()=='yes'){
                  this.bool = true;
                  this.text = 'Unavailable';
              } else {
                  this.bool = false;
                  this.text = 'Available';
              }
          }) 
      })
  }
  ngOnInit() {
  }

}
