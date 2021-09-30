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
  keyPressed:string = "KeyPressed";

  counter:number = 0;


  @HostListener('window:keydown.arrowdown') spaceEvent(){
    this.isPlaying2 = !this.isPlaying2;
  }

  @HostListener('window:keypress',['$event']) spaceEvent1(event:any){
    this.keyPressed = event.key;
    
  }

  @HostListener('window:keydown',['$event']) spaceEvent2(event:any){
    if(event.keyCode === 38){
      this.counter++;
    }else if (event.keyCode === 40){
      this.counter--;
    }
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
