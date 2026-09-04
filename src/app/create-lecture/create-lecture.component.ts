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
import { NavigationService } from '../shared/services/Navigation.services';
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
    private sourceMediaService:SourceMediaService,
    private navigationService:NavigationService
  ) { }

  name:string = "";
  url_media:string = "";
  url_dictionary:string = "";
  url_text:string = "";

  EncoderData(path:string):string{
   return SlashEncoder.encode(path);
  }

  saveAll(){
    
  }

  saveLecture(lecture:Lecture){
    this.lectureService.SaveLecture(lecture).subscribe({
      next:(idLecture)=>{
        lecture.idLecture = idLecture;
        this.saveProgress(lecture);
      }
    });
  }

  saveSourceLecture() {
    let sourceLecture = new SourceLecture;
    sourceLecture.urlSource = this.EncoderData(this.url_text);

    let lectureParam = new Lecture;
    lectureParam.name = this.name;

    this.sourceLectureService.saveSourceLecture(sourceLecture).subscribe({
      next:(SourceLectureObject)=>{
        sourceLecture.IdSourceLecture = SourceLectureObject;
        lectureParam.sourceLecture = sourceLecture;
        lectureParam.sourceMedia = this.saveSourceMedia();
        this.saveLecture(lectureParam);
        this.navigationService.goToHome();
      }
    })
  }

  saveSourceMedia() : SourceMedia{
    const sourceMedia = new SourceMedia();
    sourceMedia.urlSource = this.EncoderData(this.url_media);
    sourceMedia.type = 1;
    this.sourceMediaService.saveSourceMedia(sourceMedia).subscribe({
      next:(SourceMediaObject)=>{
        return SourceMediaObject;
      }
    })

    return new SourceMedia;
  }

  saveProgress(lecture:Lecture) : Progress{
    let progress = new Progress();
    progress.CurrentPage = 0;
    progress.lecture = lecture;
    progress.currentTimeSecs = 0;

    this.progressService.saveProgress(progress).subscribe({
      next:(progressObject) =>{
        return progressObject;
      }
    })
    return new Progress;
  }
}
