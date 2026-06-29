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
  isThereDifficulty: boolean;

  saveWord(){
    this.word.difficulty = this.difficulty;
    this.wordService.saveWord(this.word).subscribe({
      next(value) {
        console.log("este es mi value",value);
          Object.assign(this.word, value);
          //this.word.dictionarySource = value.dictionarySource;
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
          console.log("este es mi value desde update",value);
          Object.assign(this.word, value);
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
    if (!this.difficulty.idDifficulty) {
        console.warn("Debes seleccionar una dificultad antes de guardar");
        this.isThereDifficulty = true;
        return;
    }

    this.word.difficulty = this.difficulty;

    if (!this.word.idWord || this.word.idWord === -1) {
        console.log("Entra en saveWord");
        this.saveWord();
    } else {
        console.log("Entra en update");
        this.updateWord();
    }

    this.isThereDifficulty = false;
  }
}
