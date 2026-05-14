import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lecture } from '../../shared/models/Lecture';

@Injectable({
  providedIn: 'root'
})
export class LectureService {

  private url_main = "http://localhost:8080/lecture-controller/";
  private url_save = "/save"; 

  constructor(private httpClient: HttpClient) { }

  SaveLecture(lecture: Lecture) : Observable<number>{
    return this.httpClient.post<number>(this.url_main+this.url_save,lecture);
  }

  getLectures(lectures :Lecture[]){
    this.httpClient.get<Lecture[]>(this.url_main+this.url_save).subscribe(
      (data =>{
        lectures = data;
      })
    );
  }
}
