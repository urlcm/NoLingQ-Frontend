import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { LectureComponentComponent } from "../lecture-component/lecture-component.component";
import { LectureMediaComponent } from "../lecture-media/lecture-media.component";
import { DictionaryComponent } from "../dictionary/dictionary.component";
import { DefinitionViewComponent } from "../definition-view/definition-view.component";
import { TextService } from '../features/services/TextService';
import { ActivatedRoute } from '@angular/router';
import { ProgressService } from '../features/services/Progress.sevice';
import { Progress } from '../shared/models/Progress';
import { SourceLecture } from '../shared/models/SourceLecture';
import { LectureState } from '../shared/state/LectureState.service';
import { Lecture } from '../shared/models/Lecture';
import { Word } from '../shared/models/Word';
import { splitWord, WordToArray } from '../shared/utils/word.utils';
import { removeDuplicatedWord } from '../shared/utils/filterwords.utils';

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
    private lectureStateService:LectureState
  ) { }

  @Output() textOutput: string = "";
  @Output() Words:Word[] = [];
  @Output() receiveWordFromChild: string;
  @Output() wordsNoDuplicatedMapOutPut : Map<string,Word> = new Map<string,Word>();
  @Output() wordChild: Word = new Word();
  @ViewChild(LectureComponentComponent) LectureComponentChild!: LectureComponentComponent;
  
  idLecture: number;
  progress: Progress;
  sourceLecture: SourceLecture;
  page: number;
  lecture:Lecture = new Lecture;


  ngOnInit(): void {
    this.idLecture = +this.route.snapshot.paramMap.get("id");
    this.lectureStateService.currentLecture$.subscribe(
      {
        next: (data) => {this.lecture = data
          //console.info("El objeto traido es: ",this.lecture)
          //this.getText();
        },
      }
    );
    
  }

  getText() {
    this.textService.GetText(this.lecture.sourceLecture.urlSource, this.page).subscribe(
      {
        next: (textData) => {
          this.textOutput = textData
          //console.info("Texto traido",textData)
          this.splitWordFromText();
          this.wordsNoDuplicatedMapOutPut = removeDuplicatedWord(this.Words);
          this.LectureComponentChild.changeWordsMapNoDuplicatedChild(this.wordsNoDuplicatedMapOutPut);
        },
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

  changePageToFather(page : number){
    this.page = page;
    console.info("Se cambio la pagina a ",this.page);
    this.getText();
  }

  splitWordFromText(){
      this.Words = WordToArray(splitWord(this.textOutput.trim()));
      console.info("Cantidad de palabras: ", this.Words.length)
  }

  setWordToOutput(word:string){
    this.receiveWordFromChild = word;
    console.info("Llego la palabra: "+this.receiveWordFromChild);
  }

  setWordObject(word:Word){
    this.wordChild = word;
    console.info("Se almaceno el elemento Word",this.LectureComponentChild);
  }

}
