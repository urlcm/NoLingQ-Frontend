import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { LectureComponentComponent } from "../lecture-component/lecture-component.component";
import { LectureMediaComponent } from "../lecture-media/lecture-media.component";
import { DictionaryComponent } from "../dictionary/dictionary.component";
import { Router, RouterLink } from "@angular/router";
import { NavigationService} from '../features/services/Navigation.services';
import { LectureService } from '../features/services/Lecture.service';

@Component({
  selector: 'app-home-component',
  imports: [NavbarComponent, LectureComponentComponent, LectureMediaComponent, DictionaryComponent, RouterLink],
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.css'
})
export class HomeComponentComponent implements OnInit{

  lectures = [];

  lecture: string = "Lectura";
  language: string = "Idioma";

  nameLecture: string = "Prueba";
  languageLecture : string = "prubea";

  newLecture: string = "Nueva lectura"
  textButton: string = "Editar";

  constructor(
    private navigationServices:NavigationService,
    private lectureService:LectureService) {}

  ngOnInit(): void {
    this.getLectures();
  }

  goToLecture(){
    this.navigationServices.goToLecture();
  }

  goToNewLecture(){
    this.navigationServices.goToCreateNewLecture();
  }

  getLectures(){
    this.lectureService.getLectures(this.lectures);
  }
}
