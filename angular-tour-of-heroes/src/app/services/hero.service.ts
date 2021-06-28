import { Injectable } from '@angular/core';
import { IHero, HEROES } from '../Ihero';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService:MessageService) { }

  getHeroes():Observable<IHero[]>{
    const heroes = of(HEROES);
    this.messageService.addMessage('HeroService: Fetched heroes');
    return heroes;
  }
}

