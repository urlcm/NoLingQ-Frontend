import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { NavigationService } from '../features/services/Navigation.services';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private navigationService:NavigationService) { }

  goToHome(){
    this.navigationService.goToHome();
  }
}
