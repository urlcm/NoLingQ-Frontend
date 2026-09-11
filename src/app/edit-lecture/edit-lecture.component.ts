import { Component, Input, OnInit } from '@angular/core';
import { LectureService } from '../shared/services/Lecture.service';
import { Lecture } from '../shared/models/Lecture';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationService } from '../shared/services/Navigation.services';

@Component({
  selector: 'app-edit-lecture',
  imports: [FormsModule],
  templateUrl: './edit-lecture.component.html',
  styleUrl: './edit-lecture.component.css'
})
export class EditLectureComponent implements OnInit {

  constructor(
    private lectureService: LectureService,
    private route: ActivatedRoute,
    private navigationService:NavigationService) { }
  ngOnInit(): void {
    let id: number = +this.route.snapshot.paramMap.get("id");
    this.getLecture(id);
  }

  name_lecture: string = "";
  url_media: string = "";
  url_dictionary: string = "";
  url_text: string = "";

  lecture: Lecture;

  save() {
    this.lecture.name = this.name_lecture;
    this.lecture.sourceLecture.urlSource = this.url_text;
    this.lecture.sourceMedia.urlSource = this.url_media;

    this.lectureService.updateLecture(this.lecture).subscribe({
      next: (data) => {
        console.log("Data modificada", data);
        this.goToHome();
      },
      error: (error) => {
        console.error("se dio el siguiente error al querer modificar", error);
      }
    });
  }

  getLecture(id: number) {
    this.lectureService.getLectureById(id).subscribe((data: Lecture) => {
      this.name_lecture = data.name;
      this.url_text = data.sourceLecture.urlSource;
      this.url_media = data.sourceMedia.urlSource;
      this.lecture = data;
    })
  }

  goToHome(){
    this.navigationService.goToHome();
  }
}
