import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Word } from '../shared/models/Word';
import { formatWord } from "../shared/utils/formatword.utils";
import { WordService } from '../features/services/word.services';
import { removeDuplicateWord } from '../shared/utils/filterwords.utils';

@Component({
  selector: 'app-lecture-component',
  imports: [FormsModule],
  templateUrl: './lecture-component.component.html',
  styleUrl: './lecture-component.component.css'
})
export class LectureComponentComponent {
  constructor(private wordService:WordService){}

  @Input() textPage: string;
  @Input() WordsInput:Word[];
  wordsNoDuplicated : string[];

  @Output() changePageFromChild = new EventEmitter<number>();

  @Output() SearchWordFromChild = new EventEmitter<string>();
  
  page:number = 1;

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

  removeWordDuplicates(word:string){
    //removeDuplicateWord()
  }
}
