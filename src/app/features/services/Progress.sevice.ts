import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Progress } from "../../shared/models/Progress";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: "root"
})
export class ProgressService{
    constructor(private httpClient: HttpClient) {}
    public progress: Progress

    url_main = "http://localhost:8081/progress-controller/"
    url_gettById = "get-progress/"
    url_getByLecture = "get-progress-by-lecture/"
    url_save = "save"



    getProgressById(id:number):Observable<Progress>{
        return this.httpClient.get<Progress>(this.url_main + this.url_gettById + id);
    }

    getProgressByLecture(id:number):Observable<Progress>{
        return this.httpClient.get<Progress>(this.url_main +this.url_getByLecture+id)
    }

    saveProgress(progress:Progress):Observable<Progress>{
        return this.httpClient. post<Progress>(this.url_main +this.url_save, progress);
    }


}