import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { VideoItem } from '../models/video';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root',
})

export class PlaylistService {
  private readonly authService = inject(AuthService)
  playlist = signal<VideoItem[]>([]);

  isPlaylistEmpty = computed(() => this.playlist().length === 0)

  private readonly _ = effect(() => {
    const user = this.authService.currentUser();
    if (user) {
      this.loadPlaylist(user.pseudo);
    }else {
      this.playlist.set([]);
    }
  })

  loadPlaylist(pseudo: string) {
    const data = localStorage.getItem('playlist_' + pseudo);
    if (data) {
      this.playlist.set(JSON.parse(data));
    }else{
      this.playlist.set([])
    }
  }

  addVideo(video: VideoItem, pseudo: string) {
    const videos = this.playlist();
    const updated = [...videos, video];
    localStorage.setItem('playlist_' + pseudo, JSON.stringify(updated));
    this.playlist.set(updated);
    
  }

  removeVideo(videoId: string, pseudo: string) {
    const videos = this.playlist();
    const updated = videos.filter(v => v.id !== videoId);
    localStorage.setItem('playlist_' + pseudo, JSON.stringify(updated));
    this.playlist.set(updated);
    
  }
}
