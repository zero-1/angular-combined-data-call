import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../service/data.service';
import {Observable, Subscription, EMPTY, combineLatest, forkJoin} from 'rxjs';
import { catchError } from 'rxjs/operators';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnDestroy {

  constructor(
    private dataService: DataService
  ) { }

  dataProvider1$: Observable<any>;
  dataProvider2$: Observable<any>;
  combinedDataProvider: Array<any>;

  dataProvider3$: Observable<any>;
  dataProvider4$: Observable<any>;
  forkJoinedDataProvider: Array<any>;

  postsWithUsers: Observable<any>;

  subs: Subscription;

  dynamicQuery$: Array<Observable<any>>;
  
  ngOnInit() {

  this.dataProvider1$ = this.dataService.getDataOne();
  this.dataProvider2$ = this.dataService.getDataTwo();


  this.subs = combineLatest(this.dataProvider1$, this.dataProvider2$)
    .subscribe((combinedValues) => {
      //console.log(combinedValues)
      this.combinedDataProvider = combinedValues;
    })


  this.dataProvider3$ = this.dataService.getDataOne();
  this.dataProvider4$ = this.dataService.getDataTwo();

  this.subs = forkJoin(this.dataProvider3$, this.dataProvider4$)
    .subscribe((combinedValues) => {
      //console.log(combinedValues)
      this.forkJoinedDataProvider = combinedValues;
    })

  this.subs = this.dataService.getPostsWithUser()
    .subscribe((value) => {
      this.postsWithUsers = value;
     console.log(value);  //update here
    });


// way to combine unknown number of calls 
/*
  this.dynamicQuery$ = [1,2,3,4].map(id => {  
      return this.dataService.getDataById(id);
    });
  combineLatest(this.dynamicQuery$).subscribe(result => {
      console.log('resultL::', result)
    })  

*/





  }

  



  ngOnDestroy() {
    this.subs.unsubscribe();
  }


}