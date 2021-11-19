import { Component, OnInit } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {HttpClient,HttpErrorResponse,HttpParams } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { NetlifyFormsService } from "../../netlify-forms.service";
import { Subscription } from 'rxjs';
import { NgForm }   from '@angular/forms';
import { Newsletter } from '../../interface/Newsletter';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
/**
* Footer component
*/
export class FooterComponent implements OnInit {
  isVisible = false;
  cur_year = new Date().getFullYear();
  currentSection = 'footer';
  success="";
  email: "sangam";
  subscribe: "";
  loading: boolean;
  emailSent: boolean;
  emailFailed: boolean;
  form: FormGroup;
  submitted = false;
  formSuccess = false;

  constructor(
    private http: HttpClient,
    private netlifyForms: NetlifyFormsService,
    private formBuilder: FormBuilder,

  ) { }

  private formStatusSub: Subscription;

  ngOnInit(): void {

    // Form validation
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]]
    });
  }

  // Submit form
  onSubmit(){
    // Change form status
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    const data = {
      email: this.form.value.email,
    };

    const entry = {
      ...data,
    } as Newsletter;
    console.log(data,entry);
    this.formStatusSub = this.netlifyForms.submitNewsletter(entry).subscribe(
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
        this.emailFailed = true;
        this.formSuccess = true;
        setTimeout(() => {
          this.emailFailed = false;
        }, 10000);
      }
    );


  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }


  ngOnDestroy() {
    this.formStatusSub ? this.formStatusSub.unsubscribe() : null;
  }

  windowScroll() {
    const navbar = document.getElementById('footer');
    if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
      navbar.style.backgroundColor = '#272a33';
      navbar.style.padding = '10px';
    }
    else {
      navbar.style.backgroundColor = '';
      navbar.style.padding = '20px';
    }
  }

  /**
  * Onclick color change
  * @param theme theme color
  */
  setTheme(theme) {
    document
    .getElementById('color-opt')
    .setAttribute('href', 'assets/css/colors/' + theme + '.css');
  }

  toggleSwitcher() {
    this.isVisible = !this.isVisible;
  }

}
