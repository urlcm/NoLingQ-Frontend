import { Injectable, OnInit } from "@angular/core";
import { Progress } from "../../shared/models/Progress";
import { ProgressService } from "./Progress.sevice";
import { LectureState } from "../../shared/state/LectureState.service";
import { Lecture } from "../../shared/models/Lecture";
import { Subscription } from "rxjs";
import { SlashEncoder } from "../../shared/pipes/SlashEnconder";

@Injectable({
    providedIn: 'root'
})
export class AudioService implements OnInit{
    private audioBook: HTMLAudioElement;
    private lecture : Lecture;
    private progress: Progress;

    constructor(private progressService:ProgressService,
        private lectureStateService :LectureState
    ) {}

    ngOnInit(){
        this.lectureStateService.currentLecture$.subscribe({
            next: (lectureResult:Lecture) => {
                console.log("Este es el resultado de lecture",lectureResult);
                this.lecture = lectureResult;
                this.audioBook = new Audio(SlashEncoder.encode(this.lecture.sourceMedia.urlSource))
                this.findProgressById();
            },
            error: (error:any) => {
                console.log("Error al cargar lectureState",error);
            }
        })
    }

    setProgress(progressParam:Progress) {
        this.progress = progressParam;
    }


    play(){

        this.ngOnInit();

        console.log("Este es el objeto progress",this.progress);

        if(!this.progress.currentTimeSecs) {
            this.progress.currentTimeSecs = BigInt("0");
        }

        this.audioBook.currentTime = Number.parseInt(this.progress.currentTimeSecs.toString());

        this.audioBook.play().catch(error => {
            console.error("Error al reproducir audio:", error);
        });
    }


    stopPlaying(){
        this.progress.currentTimeSecs = BigInt(this.audioBook.currentTime.toString());
        this.audioBook.pause();
        this.saveProgress();
    }

    saveProgress(){
        this.progressService.saveProgress(this.progress).subscribe({
            next:(progressObject) =>{
                console.info("Progreso guardado",progressObject)
            },
            error: (error) => {
                console.error("Se presento el siguiente error al querer guardar",error)
            }
        });
    }

    findProgressById(){
        this.progressService.getProgressByLecture(this.lecture.idLecture).subscribe({
            next: (progressObject:Progress) => {
                this.progress = progressObject
            },
            error:(error:any) => {
                console.error("Error al buscar el objeto progress",error);
            }
        })
    }


}