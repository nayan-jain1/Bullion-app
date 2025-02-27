import { Component } from '@angular/core';
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
//import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [ FooterComponent, HeaderComponent, NavbarComponent, DashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Angular-bullion';
}
