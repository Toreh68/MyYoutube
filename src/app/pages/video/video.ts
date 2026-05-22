import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SafePipe } from '../../pipes/safe-pipe';

@Component({
  selector: 'app-video',
  imports: [SafePipe],
  templateUrl: './video.html',
  styleUrl: './video.css',
})
export class Video {
  private readonly route = inject(ActivatedRoute);
  videoId = signal('');

  

  onInit() {
      this.route.params.subscribe(params => {
      this.videoId.set(params['id']);
    });}
}