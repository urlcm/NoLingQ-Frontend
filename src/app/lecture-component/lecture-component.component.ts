import { Component, OnInit } from '@angular/core';
import { TextService } from '../features/services/TextService';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import { ProgressService } from '../features/services/Progress.sevice';
import { Observable } from 'rxjs';
import { Progress } from '../shared/models/Progress';
import { SourceLecture } from '../shared/models/SourceLecture';
import { SourceLectureService } from '../features/services/SourceLecture.service';

@Component({
  selector: 'app-lecture-component',
  imports: [FormsModule],
  templateUrl: './lecture-component.component.html',
  styleUrl: './lecture-component.component.css'
})
export class LectureComponentComponent {
  constructor(){}

  page = 1;


}
