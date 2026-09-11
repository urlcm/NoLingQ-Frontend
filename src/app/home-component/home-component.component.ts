import { Component, OnInit, Output } from '@angular/core';
import { NavigationService} from '../shared/services/Navigation.services';
import { LectureService } from '../shared/services/Lecture.service';
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
  languageLecture : string = "prueba";

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

  goToEditLecture(id:number){
    this.navigationServices.goToEditLecture(id);
  }

  getLectures(){
    this.lectureService.getLectures().subscribe(
      {
        next: (data) => {
          this.lectures = data;
          console.info("Lecturas obtenidas; ",this.lectures);
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
    let lectureFilter:Lecture = findById(this.lectures, id);
    console.info("El id de la lectura es: "+id)
    console.info("Objeto devuelto en el filtro: ",lectureFilter);
    return lectureFilter;
  }

  deleteLecture(id:number){
    this.lectureService.deleteLectureById(id).subscribe(
      {
        next:()=>{
          this.removeFromArray(id);
          console.info("Se ejecuto el metodo delete");
        },
        error:(err:any)=>{
          console.error("Se presento el siguiente error", err);
        }
      }
    );
  }

  removeFromArray(id:number){
  this.lectures = this.lectures.filter(item => item.idLecture !== id);
  }
}
