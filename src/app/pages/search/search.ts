import { Component, inject, signal } from '@angular/core';
import { VideoService } from '../../services/video';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { PlaylistService } from '../../services/playlist';

@Component({
  selector: 'app-search',
  imports: [RouterLink],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {
  videoService = inject(VideoService)
  private readonly authService = inject(AuthService)
  private readonly playlistService = inject(PlaylistService)

  query = this.videoService.query;
  results = this.videoService.results;
  loading = this.videoService.loading;

  showHistory = signal(false)

  


  onSearch() {
    this.loading.set(true);
    this.videoService.addToHistory(this.query())
    this.videoService.search(this.query()).subscribe({
      next: (data: any) => {
        this.results.set(data.items);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false)
      }
    })
  }

  addToPlaylist(video: any) {
    const pseudo = this.authService.currentUser()?.pseudo ?? '';
    this.playlistService.addVideo({
      id: video.id.videoId,
      title: video.snippet.title,
      thumbnail: video.snippet.thumbnails?.medium?.url ?? video.snippet.thumbnails?.default?.url ?? ''
    }, pseudo);
  }

  

}
