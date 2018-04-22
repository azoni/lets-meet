import { Component, style } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
  })
export class AppComponent {
    public bool:string;
    public value: FirebaseListObservable<any[]>;
    constructor(db: AngularFireDatabase) {
        this.value = db.list('/', {
            preserveSnapshot: true
        });
        this.value.subscribe(keys => {
            keys.forEach(key => {
                if(key.val()=='yes'){
                    this.bool = 'Unavailable'
                } else {
                    this.bool = 'Available'
                }
            }) 
        })
    }
}