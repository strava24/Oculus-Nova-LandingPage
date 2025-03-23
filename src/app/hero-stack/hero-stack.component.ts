import { Component } from '@angular/core';

@Component({
  selector: 'app-hero-stack',
  imports: [],
  templateUrl: './hero-stack.component.html',
  styleUrl: './hero-stack.component.css'
})
export class HeroStackComponent {
  scrollToFooter() {
    const element = document.getElementById('footer');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  toApp() {
    window.open('https://oculus-nova-130574953929.asia-south1.run.app/', '_blank');
  }

}
