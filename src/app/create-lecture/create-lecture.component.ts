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
import { forkJoin, map, switchMap } from 'rxjs';
//import { createLecture } from '../shared/utils/lecture.utils';
@Component({
  selector: 'app-create-lecture',
  imports: [FormsModule],
  templateUrl: './create-lecture.component.html',
  styleUrl: './create-lecture.component.css'
})
export class CreateLectureComponent {
  constructor(
    private lectureService: LectureService,
    private sourceLectureService: SourceLectureService,
    private progressService: ProgressService,
    private sourceMediaService: SourceMediaService,
    private navigationService: NavigationService
  ) { }

  name: string = "";
  url_media: string = "";
  url_dictionary: string = "";
  url_text: string = "";

  EncoderData(path: string): string {
    return SlashEncoder.encode(path);
  }

  saveAll() {
    let sourceLecture = new SourceLecture(this.EncoderData(this.url_text));

    let sourceMedia = new SourceMedia();
    sourceMedia.urlSource = this.EncoderData(this.url_media);
    //sourceMedia.type = 0;

    forkJoin({
      savedSourceLecture: this.sourceLectureService.saveSourceLecture(sourceLecture),
      savedSourceMedia: this.sourceMediaService.saveSourceMedia(sourceMedia)
    }).pipe(
      switchMap(({ savedSourceLecture, savedSourceMedia }) => {
        console.log('savedSourceMedia completo:', savedSourceMedia);
        console.log('idSourceMedia:', savedSourceMedia?.idSourceMedia);
        console.log('sourceLecture completo:', savedSourceLecture);
        sourceLecture = savedSourceLecture

        sourceMedia = savedSourceMedia;

        const lecture = new Lecture(
          this.EncoderData(this.name),
          sourceLecture,
          sourceMedia)

        return this.lectureService.SaveLecture(lecture).pipe(
          map(idLecture => {
            lecture.idLecture = idLecture.idLecture;
            return lecture;
          })
        );
      }),

      switchMap((lecture: Lecture) => {
        const progress = new Progress();
        progress.CurrentPage = 0;
        progress.currentTimeSecs = 0;
        progress.lecture = lecture; 

        return this.progressService.saveProgress(progress);
      })

    ).subscribe(
      {
        next: () => {
          this.navigationService.goToHome();
        },
        error: (err: any) => {
          console.error("Error completo:", err);
          console.error("Status:", err.status);
          console.error("Mensaje:", err.error);
          this.navigationService.goToHome();
        }
      }
    )
  }
}
