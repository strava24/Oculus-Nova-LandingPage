import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { HeroStackComponent } from './hero-stack/hero-stack.component';
import { FeaturesComponent } from './features/features.component';
import { PricingComponent } from './pricing/pricing.component';
import { TeamComponent } from './team/team.component';
import { FooterComponent } from './footer/footer.component';
import { LaunchingSsonPageComponent } from './launching-sson-page/launching-sson-page.component';

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, HeroStackComponent, FeaturesComponent, PricingComponent, TeamComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'oculus-nova-landing-page';
}
