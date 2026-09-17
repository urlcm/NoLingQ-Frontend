import { Component, input, Input, signal } from '@angular/core';
import { Word } from '../shared/models/Word';
import { FormsModule } from '@angular/forms';
import { WordService } from '../shared/services/word.services';
import { Difficulty, DifficultyLevel } from '../shared/models/Difficulty';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-definition-view',
  imports: [FormsModule, NgFor],
  templateUrl: './definition-view.component.html',
  styleUrl: './definition-view.component.css'
})
export class DefinitionViewComponent {
  constructor(
    private wordService: WordService,
  ) { }
  difficulty: Difficulty = new Difficulty();
  tags:Word[] = [];
  placeholder: string = "Link to parend";
  currentValue:Word = new Word;


  @Input() word = new Word;
  isThereDifficulty: boolean;


  addTag(event: Event) {
    event.preventDefault();
    this.currentValue.word = this.currentValue.word.trim();

    if(!this.currentValue.word) {
      return;
    }

    const alreadyExist = this.tags.some(tag => tag.word.toLowerCase() === this.currentValue.word.toLowerCase());

    if(!alreadyExist) {
      console.log("Datos a enviar", this.currentValue);
      this.findWordByWord();
    }
  }

  onBackspace() {
    if(this.currentValue.word.length === 0 && this.tags.length > 0){
      this.removeTag(this.tags.length-1);
    }
  }

  removeTag(indexToRemove: number): void {
    this.tags.splice(indexToRemove,1)
  }

  saveWord() {
    this.word.difficulty = this.difficulty;
    this.wordService.saveWord(this.word).subscribe({
      next: (value) => {
        Object.assign(this.word, value);
        this.difficulty = new Difficulty();
      },
      error: (error: any) => {
        console.error("Se obtuvo el siguiente error al querer ingresar", error);
      }
    })
  }

  updateWord() {
    this.word.difficulty = this.difficulty;
    this.wordService.updateWord(this.word).subscribe({
      next: (value) => {
        Object.assign(this.word, value);
        this.difficulty = new Difficulty();
        console.info("Se actualizó la palabra: " + this.word + " con dificultad: " + this.word.difficulty.idDifficulty);
      },
      error: (error: any) => {
        console.error("Se obtuvo el siguiente error al querer actualizar: ", error);
      }
    })
  }

  changeStatus(id: number) {
    this.difficulty.idDifficulty = id;
    console.info("Se cambia la dificultad a: " + this.difficulty.idDifficulty)
  }

  saveDifficulty() {
    if (!this.difficulty.idDifficulty) {
      console.warn("Debes seleccionar una dificultad antes de guardar");
      this.isThereDifficulty = true;
      return;
    }

    this.word.difficulty = this.difficulty;
    this.word.word = this.word.word.toLowerCase();

    if (!this.word.idWord || this.word.idWord === -1) {
      console.log("Entra en saveWord");
      this.saveWord();
    } else {
      console.log("Entra en update");
      this.updateWord();
    }

    this.isThereDifficulty = false;
  }

  findWordByWord(){
    this.wordService.getWordByWord(this.currentValue.word).subscribe({
      next: (data: Word) => {
        console.log("Data que llego",data);
        if(data != null) {
          this.tags.push(data);
          this.currentValue = new Word;
        }
      },
      error: (error: any) => {
        console.log("Error al buscar la palabra", error);
      }
    })
  }
}
