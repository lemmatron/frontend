
import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from "@angular/common/http";
import { Newsletter } from "src/app/interface/Newsletter";
import { ContactUs } from "src/app/interface/ContactUs";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class NetlifyFormsService {
  constructor(private http: HttpClient) {}

  submitContactUs(contactUs: ContactUs): Observable<string> {
    const entry = new HttpParams({
      fromObject: {
        "form-name": "contactus",
      },
    });
    return this.submitForm(entry);
  }

  submitNewsletter(newsletter: Newsletter): Observable<string> {
    const entry = new HttpParams({
      fromObject: {
        "form-name": "newsletter",
        "email": newsletter.email
      },
    });
    return this.submitForm(entry);
  }

  private submitForm(entry: HttpParams): Observable<string> {
    return this.http
      .post("/", entry.toString(), {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        responseType: "text",
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse) {
    let errMsg = "";

    if (err.error instanceof ErrorEvent) {
      errMsg = `Client-side error: ${err.error.message}`;
    } else {
      errMsg = `Server-side error. Code: ${err.status}. Message: ${err.message}`;
    }

    return throwError(errMsg);
  }
}
