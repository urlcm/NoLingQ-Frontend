import { Injectable, OnInit } from "@angular/core";
import { Progress } from "../models/Progress";
import { ProgressService } from "./Progress.sevice";
import { LectureState } from "../state/LectureState.service";
import { Lecture } from "../models/Lecture";
import { Subscription } from "rxjs";
import { SlashEncoder } from "../pipes/SlashEnconder";
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class AudioService {
    private audioBook: HTMLAudioElement;
    private lecture: Lecture;
    private progress: Progress;
    private url_main = "http://localhost:8081/audio-controller/"
    private url_getaudio = "get-audio"

    constructor(private progressService: ProgressService,
        private lectureStateService: LectureState,
        private httpClient: HttpClient,
    ) {
        this.lectureStateService.currentLecture$.subscribe({
            next: (lectureResult) => {
                console.log("Este es el resultado de lecture", lectureResult);
                this.lecture = lectureResult;
                this.findProgressById();
                this.getAudio();
            },
            error: (error: any) => {
                console.log("Error al cargar lectureState", error);
            }
        })
    }


    setProgress(progressParam: Progress) {
        this.progress = progressParam;
    }


    play() {
        //this.stopPlaying();
        console.log("Este es el objeto progress", this.progress);


            if (this.progress.currentTimeSecs! == null) {
                this.progress.currentTimeSecs = 0;
                console.log("Este es el valor de currentTime", this.progress.currentTimeSecs);
            }

            this.audioBook.play(); 

    }

    getAudio() {
        const params = new HttpParams()
        .set('path', this.lecture.sourceMedia.urlSource)
        this.httpClient.get(`${this.url_main + this.url_getaudio}`, { params 
            ,responseType: 'blob' })
            .subscribe({
                next: (blob) => {
                    const url = URL.createObjectURL(blob);
                    this.audioBook = new Audio(url);
                    this.audioBook.currentTime = Number(this.progress.currentTimeSecs);
                    console.log("Este es el audibook",this.audioBook)
                    this.audioBook.onended = () => URL.revokeObjectURL(url);
                },
                error: (err) => {
                    console.error(`Audio no encontrado para: ${this.lecture.sourceMedia.urlSource}`, err);
                }
            });
    }


    stopPlaying() {
        this.audioBook.pause();
        this.progress.currentTimeSecs = Number(Math.floor(this.audioBook.currentTime));
        this.saveProgress();
    }

    private saveProgress() {
        this.progressService.saveProgress(this.progress).subscribe({
            next: (progressObject) => {
                console.info("Progreso guardado", progressObject)
            },
            error: (error) => {
                console.error("Se presento el siguiente error al querer guardar", error)
            }
        });
    }

    private findProgressById() {
        this.progressService.getProgressByLecture(this.lecture.idLecture).subscribe({
            next: (progressObject: Progress) => {
                this.progress = progressObject
                console.info("Objeto progress", progressObject)
            },
            error: (error: any) => {
                console.error("Error al buscar el objeto progress", error);
            }
        })
    }

    isThereAudiobook():boolean{
        if(!this.audioBook)
            return true;

        return false;
    }
}