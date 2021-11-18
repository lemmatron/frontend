import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-index7',
  templateUrl: './index7.component.html',
  styleUrls: ['./index7.component.css'],
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .dark-modal .modal-content {
      background-color: #000000;
      color: white;
      border-radius : 10px;
    }
    .dark-modal .modal-header {
      border : none
    }
    .dark-modal .close {
      color: white;
    }
  `]
})
/**
 * Index-7 component
 */
export class Index7Component implements OnInit {
  id = 'JlvxDa7Sges';

  private player;
  private ytEvent;
  constructor(private modalService: NgbModal) {
  }
  currentSection = 'home';

  ngOnInit(): void {
    let i = 1;
    setInterval(() => {
      if (i === 1) { document.getElementById('foo').innerHTML = 'Professional Landing Page Template'; }
      else if (i === 2) { document.getElementById('foo').innerHTML = 'We help startups launch their products'; }
      else { document.getElementById('foo').innerHTML = 'Perfect solution for small businesses'; }
      if (i >= 3) { i = 0; }
      i++;
    }, 2500);
  }
  /**
   * Window scroll method
   */
  // tslint:disable-next-line: typedef
  windowScroll() {
    const navbar = document.getElementById('navbar');
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
   * Section changed method
   * @param sectionId specify the current sectionID
   */
  onSectionChange(sectionId: string) {
    this.currentSection = sectionId;
  }

  /**
   * Toggle navbar
   */
  toggleMenu() {
    document.getElementById('navbarCollapse').classList.toggle('show');
  }

  /**
   * Open modal
   * @param content content
   */
  openModal(content) {
    this.modalService.open(content, { windowClass: 'dark-modal', size: 'lg' });
  }
  onStateChange(event) {
    this.ytEvent = event.data;
  }
  savePlayer(player) {
    this.player = player;
  }
  playVideo() {
    this.player.playVideo();
  }
  pauseVideo() {
    this.player.pauseVideo();
  }
}
