import { Component, Input } from '@angular/core';
import { Word } from '../shared/models/Word';
import { FormsModule } from '@angular/forms';
import { WordService } from '../features/services/word.services';
import { Difficulty, DifficultyLevel } from '../shared/models/Difficulty';

@Component({
  selector: 'app-definition-view',
  imports: [FormsModule],
  templateUrl: './definition-view.component.html',
  styleUrl: './definition-view.component.css'
})
export class DefinitionViewComponent {
  constructor(
    private wordService: WordService,
  ){}
  difficulty: Difficulty = new Difficulty();

  @Input() word = new Word;

  saveWord(){
    this.word.difficulty = this.difficulty;
    this.wordService.saveWord(this.word).subscribe({
      next(value) {
          this.word = value;
          this.difficulty = new Difficulty();
          console.info("Se guardó la palabra nueva: ",this.word);
      },
      error(error:any) {
        console.error("Se obtuvo el siguiente error al querer ingresar",error);
      }
    })
  }

  updateWord(){
    this.word.difficulty = this.difficulty;
    this.wordService.updateWord(this.word).subscribe({
      next(value) {
          this.word = value;
          this.difficulty = new Difficulty();
          console.info("Se actualizó la palabra: "+this.word+" con dificultad: "+this.word.difficulty.idDifficulty);
      },
      error (error:any) {
        console.error("Se obtuvo el siguiente error al querer actualizar: ",error);
      }
    })
  }

  changeStatus(id:number){
    this.difficulty.idDifficulty = id;
    console.info("Se cambia la dificultad a: "+this.difficulty.idDifficulty)
  }

  saveDifficulty(){
    if(!this.difficulty.idDifficulty){
      this.saveWord();
    }
    else{
      this.updateWord();
    }
  }
}
