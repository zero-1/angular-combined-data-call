import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, throwError, combineLatest } from 'rxjs';
import { map, take, first, catchError, tap } from 'rxjs/operators';
@Injectable()
export class DataService {

  constructor(
    private http:HttpClient
  ) { }

  getDataOne(): Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/todos/1')
      .pipe(
        map((value) => {
          return value;
        }),
        catchError(this.handleError)
      )
  }

  getDataTwo(): Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/todos/2')
      .pipe(
        map((value) => {
          return value;
        }),
        catchError(this.handleError)
      )
  }

  getUsers(): Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/users')
      .pipe(
        map((value) => {
          return value;
        }),
        catchError(this.handleError)
      )
  }

  getPosts(): Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/posts')
      .pipe(
        map((value) => {
          return value;
        }),
        catchError(this.handleError)
      )
  }

  getPostsWithUser(): Observable<any> {
    return combineLatest(this.getUsers(), this.getPosts())
      .pipe(
        tap(values => console.log(values)),
        map(([users, posts]) => {
          return users.map(user => ({
            ...user,
            commentsCount: 20 // update logic here
          }))
        })
      )
  }

  handleError(err) {
    return throwError('Some error occured');
  }

}