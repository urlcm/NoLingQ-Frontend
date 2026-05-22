import { Component, OnInit } from '@angular/core';
import { LectureComponentComponent } from "../lecture-component/lecture-component.component";
import { LectureMediaComponent } from "../lecture-media/lecture-media.component";
import { DictionaryComponent } from "../dictionary/dictionary.component";
import { DefinitionViewComponent } from "../definition-view/definition-view.component";
import { TextService } from '../features/services/TextService';
import { ActivatedRoute } from '@angular/router';
import { ProgressService } from '../features/services/Progress.sevice';
import { SourceLectureService } from '../features/services/SourceLecture.service';
import { Progress } from '../shared/models/Progress';
import { SourceLecture } from '../shared/models/SourceLecture';
import { LectureState } from '../shared/state/LectureState.service';
import { Lecture } from '../shared/models/Lecture';

@Component({
  selector: 'app-lecture-view',
  imports: [LectureComponentComponent, LectureMediaComponent, DictionaryComponent, DefinitionViewComponent],
  templateUrl: './lecture-view.component.html',
  styleUrl: './lecture-view.component.css'
})
export class LectureViewComponent implements OnInit {

  constructor(
    private textService: TextService,
    private route: ActivatedRoute,
    private progressService: ProgressService,
    private sourceLectureService: SourceLectureService,
    private lectureStateService:LectureState
  ) { }

  idLecture: number;
  progress: Progress;
  sourceLecture: SourceLecture;
  text: string = "";
  page: number = 1;
  lecture:Lecture = new Lecture;

  ngOnInit(): void {
    this.idLecture = +this.route.snapshot.paramMap.get("id");
    this.lectureStateService.currentLecture$.subscribe(
      {
        next: (data) => this.lecture = data,
      }
    );
    this.getSourceLectureById();
  }

  //falta agregar el lecutre
  getText() {
    this.textService.GetText(this.lecture.sourceLecture.urlSource, this.page).subscribe(
      {
        next: (textData) => this.text = textData,
        error: (error) => console.error("Se presento el siguiente error en getText ",error)
      }
    )
  }

  getProgress() {
    this.progressService.getProgressById(this.idLecture).subscribe({
      next: (data) => {
        this.progress = data;
        console.info(this.progress);
      },
      error: (error: any) => {
        console.error("Se presento el siguiente error en getProgress ",error);
      }
    });
  }

  getSourceLectureById() {
    this.sourceLectureService.getSourceLectureById(this.idLecture).subscribe({
      next: (data) => {
        console.info("Objeto devuelto", data);
        this.sourceLecture = data;
        this.getText();
      },
      error: (error: any) => {
        console.error("Se presento el siguiente error en getSourLecture ",error)
      }
    })

  }
}
