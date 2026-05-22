import { Component, OnInit } from '@angular/core';
import { NavigationService} from '../features/services/Navigation.services';
import { LectureService } from '../features/services/Lecture.service';
import { NgForOf } from "@angular/common";
import { Lecture } from '../shared/models/Lecture';
import { LectureState } from '../shared/state/LectureState.service';
import { findById } from '../shared/utils/lecture.utils';

@Component({
  selector: 'app-home-component',
  imports: [NgForOf],
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.css'
})
export class HomeComponentComponent implements OnInit{

  lectures:Lecture[] = [];

  lecture: string = "Lectura";
  language: string = "Idioma";

  nameLecture: string = "Prueba";
  languageLecture : string = "prubea";

  newLecture: string = "Nueva lectura"
  textButton: string = "Editar";

  constructor(
    private navigationServices:NavigationService,
    private lectureService:LectureService,
    private lectureStateService:LectureState) {}

  ngOnInit(): void {
    this.getLectures();
  }

  goToLecture(id:number){
    console.log("Click ejecutado, id:", id);
    this.lectureStateService.updateLecture (this.filterById(id));
    this.navigationServices.goToLecture(id);
  }

  goToNewLecture(){
    this.navigationServices.goToCreateNewLecture();
  }

  getLectures(){
    this.lectureService.getLectures().subscribe(
      {
        next: (data) => {
          this.lectures = data;
          console.info(this.lectures);
        },
        error: (error : any) => {
          console.error("Se presento el siguiente error: "+error);
        }
      });
  }

  setLecture(lecture:Lecture){
    this.lectureStateService.updateLecture(lecture);
  }

  filterById(id:number):Lecture{
    return findById(this.lectures, id);
  }
}
