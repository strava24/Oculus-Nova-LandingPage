import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  isScrolled = false;
  menuActive: boolean = false;

  toggleMenu(): void {
    this.menuActive = !this.menuActive;
  }
  
  closeMenu(): void {
    this.menuActive = false; // Ensure the menu is closed
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrolled = window.scrollY > 0;
  }

  scrollToPricing() {
    const element = document.getElementById('pricing');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToTeam() {
    const element = document.getElementById('team');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToFooter() {
    const element = document.getElementById('footer');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToFeatures() {
    const element = document.getElementById('features');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToNavBar() {
    const element = document.getElementById('navbar');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

}
