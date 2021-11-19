import { Component, OnInit } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {HttpClient,HttpParams } from '@angular/common/http';

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
  constructor(private http: HttpClient ) { }


  ngOnInit(): void {

  }

  onSubmit(x){
    const body = new HttpParams()
      .set('newsletter', 'contact')
      .append('email', x);
      this.http.post('/', body.toString(), {headers: { 'Content-Type': 'application/x-www-form-urlencoded' }})
      .subscribe(
        res => {"Thank you for subscribing to our newsletter."}
      );
    console.log(x,body);
    return false;
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
