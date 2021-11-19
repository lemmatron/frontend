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
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


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
  form: FormGroup;
  formSuccess= false;

  submitted = false;

  constructor(
    private http: HttpClient,
    private netlifyForms: NetlifyFormsService,
    private formBuilder: FormBuilder

  ) { }
  private formStatusSub: Subscription;



  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required,Validators.maxLength(60)]],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      subject: ['', [Validators.required, Validators.maxLength(15)]],
      message: ['', [Validators.required, Validators.maxLength(100)]]
    });
  }



  // Submit form
  onSubmit(){
    //Change form status
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    const data = {
      name: this.form.value.name,
      email: this.form.value.email,
      subject: this.form.value.subject,
      message: this.form.value.message
    };

    const entry = {
      ...data,
    } as ContactUs;
    console.log(data,entry);
    this.formStatusSub = this.netlifyForms.submitContactUs(entry).subscribe(
      (res) => {
        this.loading = false;
        this.emailSent = true;
        this.formSuccess = true;
        setTimeout(() => {
          this.emailSent = false;
        }, 10000);
        // contactForm.resetForm();
      },
      (err) => {
        this.loading = false;
        this.formSuccess = false;
        this.emailFailed = true;
        setTimeout(() => {
          this.emailFailed = false;
        }, 10000);
      }
    );
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

}
