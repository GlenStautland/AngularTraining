import { Component, Input, OnInit } from '@angular/core';
import { IHero } from 'src/app/Ihero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero?: IHero;
  constructor() { }

  ngOnInit(): void {
  }

}
