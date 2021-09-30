import { FocusableOption, FocusMonitor, FocusTrapFactory, ListKeyManager } from "@angular/cdk/a11y";
import { Component, ElementRef, HostListener, OnInit, QueryList, ViewChild, ViewChildren } from "@angular/core";

import { first } from "rxjs/operators";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})


export class SidebarComponent implements OnInit {


  
  keyManager : any

  @ViewChild('element') element! : ElementRef; 
  @ViewChildren('elementChild') elementChild! : QueryList<any>


 constructor (private focusTrap: FocusTrapFactory, 
 private focusMonitor : FocusMonitor) {}

  ngOnInit(): void {
    this.keyManager = new ListKeyManager(this.elementChild) 
    this.keyManager.withHorizontalOrientation('ltr') // Arrow navigation options 
    this.keyManager.withWrap()  // Arrow navigation options 
     
  }

  /* Enables keyboard arrows navigation */
  @HostListener('window:keyup', ['$event']) 
  keyFunc(event:any) {
    if (event.code !== 'Tab') {
      this.keyManager.onKeydown(event)
      this.focusMonitor.focusVia(this.keyManager.activeItem.nativeElement, "keyboard")
    }
    else {  // 'artificially' updates the active element in case the user uses Tab instead of arrows
      this.keyManager.onKeydown(event)
      this.keyManager.setNextItemActive()
    }
  }

  testA11y() {
    this.element.nativeElement.hidden = false;   
    let focusTrap = this.focusTrap.create(this.element.nativeElement)  // creates a focus trap region
    focusTrap.focusInitialElement()     // Moves the focus in the form (by default the first field)
    this.keyManager.setFirstItemActive()    // Sets the element we focused on as 'active' to the KeyManager
  }


}

