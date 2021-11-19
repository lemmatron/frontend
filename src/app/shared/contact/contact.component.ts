import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})

/**
 * Contact-component
 */
export class ContactComponent {

  constructor() { }

  submitForm(x){
    console.log("hello");
  }

  ngOnInit(): void {

  }

}
