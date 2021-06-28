import { Component, OnInit } from '@angular/core';
import { HEROES, IHero } from 'src/app/Ihero';
import { HeroService } from 'src/app/services/hero.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  heroes: IHero[] = [];
  selectedHero?: IHero;
  
  
  
  constructor(private heroService: HeroService, private messageService: MessageService ) 
  {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes=>this.heroes = heroes);
  }

  onSelect(hero:IHero): void{
    this.selectedHero = hero;
    this.messageService.addMessage(`HeroesComponent: Selected her id=${hero.id}`);
  }

}
