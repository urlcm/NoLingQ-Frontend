import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { LectureComponentComponent } from "../lecture-component/lecture-component.component";
import { LectureMediaComponent } from "../lecture-media/lecture-media.component";
import { DictionaryComponent } from "../dictionary/dictionary.component";
import { Router, RouterLink } from "@angular/router";
import { NavigationService} from '../features/services/Navigation.services';

@Component({
  selector: 'app-home-component',
  imports: [NavbarComponent, LectureComponentComponent, LectureMediaComponent, DictionaryComponent, RouterLink],
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.css'
})
export class HomeComponentComponent {

  lecture: string = "Lectura";
  language: string = "Idioma";

  nameLecture: string = "Prueba";
  languageLecture : string = "prubea";

  newLecture: string = "Nueva lectura"
  textButton: string = "Editar";

  constructor(private navigationServices:NavigationService) {}

  goToLecture(){
    this.navigationServices.goToLecture();
  }

  goToNewLecture(){
    this.navigationServices.goToCreateNewLecture();
  }
}
