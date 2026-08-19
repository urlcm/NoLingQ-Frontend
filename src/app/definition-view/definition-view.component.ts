import { Component, input, Input, signal } from '@angular/core';
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
  ) { }
  difficulty: Difficulty = new Difficulty();

  @Input() word = new Word;
  isThereDifficulty: boolean;

  tags = signal<string[]>(["Example"]);
  inputValue = "";
  placeholderText = input<string>('Type and press Enter...');

  addTag(event: Event) {
    const keyboardEvent = event as KeyboardEvent;

    keyboardEvent.preventDefault();
    const value = this.inputValue.trim();

    if (value && !this.tags().includes(value)) {
      this.tags.update(currentTags => [...currentTags, value]);
    }

    this.inputValue = "";
  }

  handleBackspace() {
    if (this.inputValue === "" && this.tags().length > 0) {
      this.tags.update(currentTags => {
        const update = [...currentTags];
        update.pop();
        return update;
      })
    }
  }

  removeTag(indexToRemove: number): void {
    this.tags.update(currentTags => currentTags.filter((_, index) => index !== indexToRemove)
    )
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
}
