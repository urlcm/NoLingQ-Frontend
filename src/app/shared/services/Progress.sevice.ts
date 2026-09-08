import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Progress } from "../models/Progress";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: "root"
})
export class ProgressService {
    constructor(private httpClient: HttpClient) { }
    public progress: Progress

    url_main = "http://localhost:8081/progress-controller/"

    url_getById = "get-progress/"
    url_getByLecture = "get-progress-by-lecture/"
    url_save = "save";

    url_put_currentTime = "update-current-time";
    url_put_currentPage = "update-current-page";



    getProgressById(id: number): Observable<Progress> {
        return this.httpClient.get<Progress>(this.url_main + this.url_getById + id);
    }

    getProgressByLecture(id: number): Observable<Progress> {
        return this.httpClient.get<Progress>(this.url_main + this.url_getByLecture + id)
    }

    saveProgress(progress: Progress): Observable<Progress> {
        return this.httpClient.post<Progress>(this.url_main + this.url_save, progress);
    }

    setCurrentTime(progress: Progress): Observable<Number> {
        return this.httpClient.put<Number>(this.url_main + this.url_put_currentTime, progress);
    }

    setCurrentPage(progress: Progress): Observable<number> {
        return this.httpClient.put<number>(this.url_main + this.url_put_currentPage, progress);
    }
}