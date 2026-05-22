import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Lecture } from "../models/Lecture";

@Injectable({
    providedIn: "root"
})
export class LectureState{
    private lectureState = new BehaviorSubject<Lecture>(null);
    currentLecture$ = this.lectureState.asObservable();

    updateLecture(lecture:Lecture){
        this.lectureState.next(lecture);
    }
}