import { Component, OnInit } from '@angular/core';
import { ContactUs } from '../../interface/ContactUs';
import {HttpClientModule} from '@angular/common/http';
import {HttpClient,HttpErrorResponse,HttpParams } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { NetlifyFormsService } from "../../netlify-forms.service";
import { Subscription } from 'rxjs';
import { NgForm }   from '@angular/forms';
import { Newsletter } from '../../interface/Newsletter';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})

/**
 * Contact-component
 */
export class ContactComponent {
  name: "";
  email: "";
  subject: "";
  message: "";
  subscribe: "";
  loading: boolean;
  emailSent: boolean;
  emailFailed: boolean;

  constructor(
    private http: HttpClient,
    private netlifyForms: NetlifyFormsService

  ) { }
  private formStatusSub: Subscription;
  onSubmit(){
    const data = {
      name: "sangam",
      email: "sangamlimbu52@gmail.com",
      subject: "test",
      message: "Hello"
    };

    const entry = {
      ...data,
    } as ContactUs;
    console.log(data,entry);
    this.formStatusSub = this.netlifyForms.submitContactUs(entry).subscribe(
      (res) => {
        this.loading = false;
        this.emailSent = true;
        setTimeout(() => {
          this.emailSent = false;
        }, 10000);
        // contactForm.resetForm();
      },
      (err) => {
        this.loading = false;
        this.emailFailed = true;
        setTimeout(() => {
          this.emailFailed = false;
        }, 10000);
      }
    );


  }

  ngOnInit(): void {

  }


}
