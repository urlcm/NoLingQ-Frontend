import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lecture } from '../models/Lecture';

@Injectable({
  providedIn: 'root'
})
export class LectureService {

  private url_main = "http://localhost:8081/lecture-controller";
  private url_save = "/save"; 
  private url_get = "/get-lectures";
  private url_get_by_id = "/get-lecture/"
  private url_delete = "/delete/";
  private url_update = "/update"

  constructor(private httpClient: HttpClient) { }

  SaveLecture(lecture: Lecture) : Observable<Lecture>{
    return this.httpClient.post<Lecture>(this.url_main+this.url_save,lecture);
  }

  getLectures():Observable<Lecture[]> {
    return this.httpClient.get<Lecture[]>(this.url_main+this.url_get);
  }

  getLectureById(id:number) :Observable<Lecture> {
    return this.httpClient.get<Lecture>(this.url_main+this.url_get_by_id+id);
  }

  deleteLectureById(id:number){
    this.httpClient.delete(this.url_main+this.url_delete+id);
  }

  updateLecture(lecture:Lecture):Observable<Lecture>{
    return this.httpClient.put<Lecture>(this.url_main+this.url_update,lecture);
  }
}
