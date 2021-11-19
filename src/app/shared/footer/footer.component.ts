import { Component, OnInit } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {HttpClient,HttpErrorResponse,HttpParams } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { NetlifyFormsService } from "../../netlify-forms.service";
import { Subscription } from 'rxjs';
import { NgForm }   from '@angular/forms';
import { Feedback } from '../../interface/feedback';

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

  // name: "";
  email: "sangam";
  // phone: "";
  // message: "";
  subscribe: "";
  loading: boolean;
  emailSent: boolean;
  emailFailed: boolean;
  constructor(private http: HttpClient,
    private netlifyForms: NetlifyFormsService ) { }


    private formStatusSub: Subscription;



    ngOnInit(): void {

    }

    onSubmit(){
      const data = {
        email: "sangam",
      };

      const entry = {
        ...data,
      } as Feedback;
      console.log(data,entry);
      this.formStatusSub = this.netlifyForms.submitFeedback(entry).subscribe(
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




  //   const body = new HttpParams()
  //   .set('form-name', 'newsletter')
  //   .append('email', x)
  //
  //   this.http.post('/', body.toString(), {headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  // }
// )
// .pipe(
//     catchError(this.handleError('addHero', x))
//   );
// .pipe(catchError(this.handleError));
// console.log(x,body.toString());
// }
//
ngOnDestroy() {
  this.formStatusSub ? this.formStatusSub.unsubscribe() : null;
}



handleError(err: HttpErrorResponse) {
  let errMsg = "";

  if (err.error instanceof ErrorEvent) {
    errMsg = `Client-side error: ${err.error.message}`;
  } else {
    errMsg = `Server-side error. Code: ${err.status}. Message: ${err.message}`;
  }

  return throwError(errMsg);
}







//   onSubmit(x){
//     const body = new HttpParams()
//     .set('form-name', 'newsletter')
//     .append('email', x)
//
//     this.http.post('/', body.toString(), {
//       headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
//     }
//   );
//   console.log(x,body.toString());
//   return false;
// }

// onSubmit(x){
//   // window.location.href='http://www.cnn.com'
//   console.log("Hello", x);
//   return false;
// }

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
