import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  scrollToNavBar() {
    const element = document.getElementById('navbar');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
