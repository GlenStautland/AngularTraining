import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/Todo';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {

  todos!: Todo[];
  inputTodo: string = "";

  constructor() { }

  ngOnInit(): void {
    this.todos = [
    {
      content: 'First todo',
      completed: false
    },
    {
      content: 'Second todo',
      completed: false
    }]
  }

  toggleDone(id:number){
    this.todos.map((v,i) =>{
      if (i == id) v.completed =!v.completed;
      return v;
    })
  }
  
  deleteTodo(id:number){
    this.todos = this.todos.filter((v,i) => i != id); 
  }

  addTodo() {
    this.todos.push({
      content: this.inputTodo,
      completed: false
    });
    this.inputTodo="";
  }

}
