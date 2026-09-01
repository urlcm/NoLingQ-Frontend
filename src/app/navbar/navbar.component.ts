import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { NavigationService } from '../shared/services/Navigation.services';
import { AudioService } from '../shared/services/AudioService';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private navigationService: NavigationService,
    private audioService: AudioService
  ) { }

  goToHome() {
    //if (this.audioService.isThereAudiobook)
      //this.stopPlay();

    this.navigationService.goToHome();
  }

  stopPlay() {
    this.audioService.stopPlaying();
  }
}
