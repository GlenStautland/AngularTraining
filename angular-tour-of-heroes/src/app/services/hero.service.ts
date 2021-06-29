import { Injectable } from '@angular/core';
import { IHero, HEROES } from '../Ihero';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(
    private messageService: MessageService,
    private http: HttpClient,
    ) { }

    private log(message: string){
      this.messageService.addMessage(`Heroservice: ${message}`)
    }

    private heroesUrl = `api/heroes`; // URL web api

  getHeroes():Observable<IHero[]>{
    return this.http.get<IHero[]>(this.heroesUrl);
  }

  getHero(id:number):Observable<IHero>{
    const hero = HEROES.find(h=>h.id === id)!;
    this.messageService.addMessage(`HeroService: fetched hero id=${id}`);
    return of(hero);
  }
}

