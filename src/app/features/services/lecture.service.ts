import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lecture } from '../../shared/models/Lecture';

@Injectable({
  providedIn: 'root'
})
export class LectureService {

  private url_main = "http://localhost:8080/lecture-controller/";
  private url_save = "lecture/save-lecture"; 

  constructor(private httpClient: HttpClient) { }

  SaveLecture(lecture: Lecture) : Observable<Object>{
    return this.httpClient.post(this.url_main,lecture);
  }
}
