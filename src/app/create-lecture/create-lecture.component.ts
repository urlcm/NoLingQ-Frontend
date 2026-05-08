import { Component } from '@angular/core';
import { SlashEncoder } from '../shared/pipes/SlashEnconder';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-create-lecture',
  imports: [FormsModule],
  templateUrl: './create-lecture.component.html',
  styleUrl: './create-lecture.component.css'
})
export class CreateLectureComponent {
  constructor() { }

  name:string = "";
  url_media:string = "";
  url_dictionary:string = "";
  url_text:string = "";

  EncoderData(path:string){
   this.url_text = SlashEncoder.encode(path);
  }
}
