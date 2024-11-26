import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [ RouterOutlet, RouterModule ],
  template: `
    <div>
      <h1>Gestión de Ciudades y Transportes</h1>
      <nav>
        <ul>
          <li><a routerLink="/cities">Ver Ciudades</a></li>
          <li><a routerLink="/transports">Ver Transportes</a></li>
        </ul>
      </nav>
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FrontEnd-SecureTrip';
}
