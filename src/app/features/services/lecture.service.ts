import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lecture } from '../../shared/models/Lecture';

@Injectable({
  providedIn: 'root'
})
export class LectureService {

  private url_main = "http://localhost:8081/lecture-controller";
  private url_save = "/save"; 
  private url_get = "/get-lectures";

  constructor(private httpClient: HttpClient) { }

  SaveLecture(lecture: Lecture) : Observable<number>{
    return this.httpClient.post<number>(this.url_main+this.url_save,lecture);
  }

  getLectures():Observable<Lecture[]> {
    return this.httpClient.get<Lecture[]>(this.url_main+this.url_get);
  }
}
