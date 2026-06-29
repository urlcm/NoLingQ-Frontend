import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Word } from '../shared/models/Word';
import { formatWord } from "../shared/utils/formatword.utils";
import { WordService } from '../features/services/word.services';
import { NgStyle } from "@angular/common";
import { ProgressService } from '../features/services/Progress.sevice';
import { Progress } from '../shared/models/Progress';
import { Lecture } from '../shared/models/Lecture';
import { LectureState } from '../shared/state/LectureState.service';
import { Difficulty, DifficultyLevel } from '../shared/models/Difficulty';
import { searchWord } from '../shared/utils/search.utils';
import { Conditional } from '@angular/compiler';

@Component({
  selector: 'app-lecture-component',
  imports: [FormsModule, NgStyle],
  templateUrl: './lecture-component.component.html',
  styleUrl: './lecture-component.component.css'
})
export class LectureComponentComponent implements OnInit{
  private progress:Progress;
  private lecture:Lecture;

  @Input() textPage: string;
  @Input() WordsInput:Word[];
  @Input() wordsMapNoDuplicatedChild : Map<string,Word> = new Map<string,Word>();
  @Input() word:Word = new Word();


  @Output() changePageFromChild = new EventEmitter<number>();
  @Output() SearchWordFromChild = new EventEmitter<string>();
  @Output() sendWordFromChild = new EventEmitter<Word>();
  
  page:number ;
  lineSpacing:number = 0.5;
  fontSize:number = 2;

  constructor(
    private wordService:WordService,
    private progressService:ProgressService,
    private lectureStateService:LectureState
  ){}

  ngOnInit(){
    this.lectureStateService.currentLecture$.subscribe(
      {
        next: (data) => {
          this.lecture = data
          //console.info("El objeto traido es: ",this.lecture)
          this.getProgressByLecture();
          //this.noDuplicateWords();
        },
        error: (error:any) => {
          console.error("Error con objeto lecture",error)
        }
      }
    );
  }


  changePage(){
    console.log("Se cambio la pagina a "+this.page)
    this.changePageFromChild.emit(this.page);
  }

  changeBackPage(){
    if(this.progress.CurrentPage > 0){
      this.page--;
      this.changePageFromChild.emit(this.page)
      this.setPage();
      this.saveProgress();
    }
  }

  changeNextPage(){
    this.page++;
    this.changePageFromChild.emit(this.page)
    this.setPage()
    this.saveProgress();
  }

  setPage(){
    //console.log("Dentro de setPage, valor inicializado de page "+this.page);
    //console.log("Valor de CurrentPage ", this.progress.CurrentPage)
    if(this.page === undefined){
      this.page = this.progress.CurrentPage;
      //console.log("Pagina al iniciar la pagina"+this.page)
    }
    else{
      this.progress.CurrentPage = this.page;
      //console.log("Pagina al iniciar la pagina en else"+this.page)
    }
  }

  lookForWordFromWebDictionary(word:string){
    const cleanWord = formatWord(word)
    this.SearchWordFromChild.emit(cleanWord);
    console.log("Se envio la palabra: "+cleanWord);
    this.sendToFather(cleanWord);
  }

  sendToFather(cleanWord:string){
    console.log("Se activa el metodo sendTofather");
    const wordObject = searchWord(cleanWord,this.wordsMapNoDuplicatedChild);
    console.log("WordObject",wordObject);
    this.sendWordFromChild.emit(wordObject);
  }

  getWordByWord(word:string){
    this.wordService.getWordByWord(word).subscribe({
      next:(word)=>{
        if(word != null){
            this.wordsMapNoDuplicatedChild.set(word.word,word);
            console.log("Se recibio el objeto",word);
        }
      },
      error:(err :any)=>{
        console.error("Ocurrió un error al buscar la palabra: "+word,err);
      }
    })
  }

  getProgressByLecture(){
    this.progressService.getProgressByLecture(this.lecture.idLecture).subscribe(
      {
        next: (progressObject)=>{
          this.progress = progressObject;
          //console.info("Objeto traido de la base de datos",this.progress);
          this.setPage();
          this.changePage();
        },
        error: (error:any)=>{
          console.error("Error con objeto progress",error);
        }
      }
    );
  }

  saveProgress(){
    this.progressService.saveProgress(this.progress).subscribe({
      next: (progressParam)=>{
        this.progress = progressParam;
        console.log("Objeto actualizado",progressParam);
      },
      error:(error:any)=>{
        console.error("Error al momento de la actualización",error);
      }
    });
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

  downSizeFont(){
    if(this.fontSize > 1)
    this.fontSize -= 0.5;
  }

  upSizeFont(){
    this.fontSize += 0.5;
  }

  changeWordsMapNoDuplicatedChild(wordsMap: Map<string, Word>){
    this.findWord(wordsMap);

    console.info("Se activa metodo desde padre")
    console.log("Cantidad de palabras sin repetir: "+ this.wordsMapNoDuplicatedChild.size);
  }

  findWord(wordsMap: Map<string, Word>){
    wordsMap.forEach(word => {
      if(!this.wordsMapNoDuplicatedChild.has(word.word)){
        this.getWordByWord(word.word);
      }
    });
  }

  getWordClass(wordText: string): string {
    const word = this.wordsMapNoDuplicatedChild.get(formatWord(wordText));
    
    if (!word || !word.difficulty?.description) {
      console.log("word debe tener formato limpio",word);
      console.log("su formato limpio es: "+formatWord(wordText))
        return DifficultyLevel.NEW;
    }
    
    return word.difficulty.description;
  }
}
