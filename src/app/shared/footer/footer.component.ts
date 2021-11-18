import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit(): void {
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
