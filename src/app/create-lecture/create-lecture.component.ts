import { Component } from '@angular/core';
import { SlashEncoder } from '../shared/pipes/SlashEnconder';
import { FormsModule } from '@angular/forms';
import { LectureService } from '../features/services/Lecture.service';
//import { createLecture } from '../shared/utils/lecture.utils';
@Component({
  selector: 'app-create-lecture',
  imports: [FormsModule],
  templateUrl: './create-lecture.component.html',
  styleUrl: './create-lecture.component.css'
})
export class CreateLectureComponent {
  constructor(private lectureService:LectureService) { }

  name:string = "";
  url_media:string = "";
  url_dictionary:string = "";
  url_text:string = "";

  EncoderData(path:string){
   this.url_text = SlashEncoder.encode(path);
  }

  saveLecture(){
    //const lectureObject = createLecture(this.name,this.url_text);
    //this.lectureService.SaveLecture(lectureObject).subscribe( );
  }
}
