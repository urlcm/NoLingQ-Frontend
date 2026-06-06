import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Word } from '../shared/models/Word';
import { formatWord } from "../shared/utils/formatword.utils";
import { WordService } from '../features/services/word.services';
import { removeDuplicateWord } from '../shared/utils/filterwords.utils';
import { NgStyle } from "@angular/common";
import { ProgressService } from '../features/services/Progress.sevice';
import { Progress } from '../shared/models/Progress';

@Component({
  selector: 'app-lecture-component',
  imports: [FormsModule, NgStyle],
  templateUrl: './lecture-component.component.html',
  styleUrl: './lecture-component.component.css'
})
export class LectureComponentComponent {
  constructor(private wordService:WordService,
    private progressService:ProgressService
  ){}

  progress:Progress;

  @Input() textPage: string;
  @Input() WordsInput:Word[];
  wordsNoDuplicated : string[];

  @Output() changePageFromChild = new EventEmitter<number>();

  @Output() SearchWordFromChild = new EventEmitter<string>();
  
  page:number = 1;
  lineSpacing:number = 0.5;

  changePage(){
    this.changePageFromChild.emit(this.page);
  }

  changeBackPage(){
    this.page--;
    this.changePageFromChild.emit(this.page)
  }

  changeNextPage(){
    this.page++;
    this.changePageFromChild.emit(this.page)
  }

  lookForWordFromWebDictionary(word:string){
    const cleanWord = formatWord(word)
    this.SearchWordFromChild.emit(cleanWord);
    console.log("Se envio la palabra: "+cleanWord);
  }

  getWordByWord(word:string){
    this.wordService.getWordByWord(word).subscribe({
      next:(word)=>{
        console.log("Se recibio el objeto",word);
      }
    })
  }

  getProgressByLecture(){
    this.progressService;
  }

  removeWordDuplicates(word:string){
    //removeDuplicateWord()
  }

  lessLineSpacing(){
    if(this.lineSpacing > 1)
    this.lineSpacing -= 0.5;
  }

  moreLineSpacing(){
    this.lineSpacing += 0.5;
  }
}
