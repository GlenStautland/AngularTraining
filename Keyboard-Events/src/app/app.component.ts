import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  name:string = "";
  isPlaying1:boolean = false;
  isPlaying2:boolean = false;
  keyPressed:string = "t";


  @HostListener('window:keydown.arrowdown') spaceEvent(){
    this.isPlaying2 = !this.isPlaying2;
  }

  @HostListener('window:keypress',['$event']) spaceEvent1(event:any){
    this.keyPressed = event.key;
  }

  onNameSubmitted(event: any){
    console.log(event);
  }

  getValue(event:any){
    console.log(event.target.value);
  }

  toggle(){
    this.isPlaying1 = !this.isPlaying1;
  }
  
}
