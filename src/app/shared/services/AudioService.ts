import { Injectable, OnInit } from "@angular/core";
import { Progress } from "../models/Progress";
import { ProgressService } from "./Progress.sevice";
import { LectureState } from "../state/LectureState.service";
import { Lecture } from "../models/Lecture";
import { Subscription } from "rxjs";
import { SlashEncoder } from "../pipes/SlashEnconder";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class AudioService {
    private audioBook: HTMLAudioElement;
    private lecture: Lecture;
    private progress: Progress;
    private url_main = "http://localhost:8081/audio-controller/"
    private url_getaudio = "get-audio/"

    constructor(private progressService: ProgressService,
        private lectureStateService: LectureState,
        private httpClient: HttpClient,
    ) {
        this.lectureStateService.currentLecture$.subscribe({
            next: (lectureResult) => {
                console.log("Este es el resultado de lecture", lectureResult);
                this.lecture = lectureResult;
                this.findProgressById();
            },
            error: (error: any) => {
                console.log("Error al cargar lectureState", error);
            }
        })
    }


    setProgress(progressParam: Progress) {
        this.progress = progressParam;
    }


    play(word: string) {
        //this.ngOnInit();
        //this.stopPlaying();

        console.log("Este es el objeto progress", this.progress);

        if (!this.progress.currentTimeSecs && this.progress.currentTimeSecs != undefined) {
            this.progress.currentTimeSecs = BigInt("0");
        }

        this.audioBook.currentTime = Number.parseInt(this.progress.currentTimeSecs.toString());

        this.httpClient.get(`${this.url_main + this.url_getaudio}${word}`, { responseType: 'blob' })
            .subscribe({
                next: (blob) => {
                    const url = URL.createObjectURL(blob);
                    this.audioBook = new Audio(url); // 👈 guardas en la propiedad
                    this.audioBook.play();
                    this.audioBook.onended = () => URL.revokeObjectURL(url);
                },
                error: (err) => {
                    console.error(`Audio no encontrado para: ${word}`, err);
                }
            });
    }


    stopPlaying() {
        this.progress.currentTimeSecs = BigInt(this.audioBook.currentTime.toString());
        this.audioBook.pause();
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


}