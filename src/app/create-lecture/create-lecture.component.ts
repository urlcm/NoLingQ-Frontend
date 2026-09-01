import { Component } from '@angular/core';
import { SlashEncoder } from '../shared/pipes/SlashEnconder';
import { FormsModule } from '@angular/forms';
import { LectureService } from '../shared/services/Lecture.service';
import { SourceLectureService } from '../shared/services/SourceLecture.service';
import { ProgressService } from '../shared/services/Progress.sevice';
import { SourceMediaService } from '../shared/services/SourceMedia.service';
import { Lecture } from '../shared/models/Lecture';
import { SourceLecture } from '../shared/models/SourceLecture';
import { SourceMedia } from '../shared/models/SourceMedia';
import { Progress } from '../shared/models/Progress';
//import { createLecture } from '../shared/utils/lecture.utils';
@Component({
  selector: 'app-create-lecture',
  imports: [FormsModule],
  templateUrl: './create-lecture.component.html',
  styleUrl: './create-lecture.component.css'
})
export class CreateLectureComponent {
  constructor(
    private lectureService:LectureService,
    private sourceLectureService:SourceLectureService,
    private progressService:ProgressService,
    private sourceMediaService:SourceMediaService
  ) { }

  name:string = "";
  url_media:string = "";
  url_dictionary:string = "";
  url_text:string = "";

  EncoderData(path:string){
   this.url_text = SlashEncoder.encode(path);
  }

  saveLecture(){
    const lecture = new Lecture(this.name);
    this.lectureService.SaveLecture(lecture).subscribe({
      next:(idLecture)=>{
        lecture.idLecture = idLecture;
      }
    });
  }

  saveSourceLecture() {
    const sourceLecture = new SourceLecture;
    sourceLecture.urlSource = this.url_text;
    this.sourceLectureService.saveSourceLecture(sourceLecture).subscribe({
      next:(SourceLectureObject)=>{
        sourceLecture.IdSourceLecture = SourceLectureObject
      }
    })
  }

  saveSourceMedia(){
    const sourceMedia = new SourceMedia();
    sourceMedia.urlSource = this.url_media;
    sourceMedia.type = 1;
    this.sourceMediaService.saveSourceMedia(sourceMedia).subscribe({
      next:(SourceMediaObject)=>{
        sourceMedia.idSourceMedia = SourceMediaObject.idSourceMedia;
      }
    })
  }

  saveProgress(lecture:Lecture) {
    let progress = new Progress();
    progress.CurrentPage = 0;
    progress.lecture = lecture;
    progress.currentTimeSecs = 0;

    this.progressService.saveProgress(progress).subscribe({
      next:(progressObject) =>{
        progress = progressObject;
      }
    })
  }
}
