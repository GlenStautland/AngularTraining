import { Injectable } from '@angular/core';
import { IHero, HEROES } from '../Ihero';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(
    private messageService: MessageService,
    private http: HttpClient,
    ) { }

  private heroesUrl = `api/heroes`; // URL web api

  private log(message: string){
    this.messageService.addMessage(`Heroservice: ${message}`)
  }

  

  getHeroes():Observable<IHero[]>{
    return this.http.get<IHero[]>(this.heroesUrl).
    pipe(
      tap(_ => this.log('Fetched Heroes')),
      catchError(this.handleError<IHero[]>('getHeroes',[])));
  }

  getHero(id:number):Observable<IHero>{
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<IHero>(url).pipe(
      tap(_=> this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<IHero>(`get hero id=${id}`))
    );
  }

  updateHero(hero:IHero): Observable<any>{
    return this.http.put(this.heroesUrl,hero,this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  

    /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @ param operation - name of the operation that failed
   * @ param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

}

