import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth';
import { PlaylistService } from '../../services/playlist';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  imports: [RouterLink],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.css',
})
export class SideBar {
  authService = inject(AuthService)
  currentUser = this.authService.currentUser
  playlistService = inject(PlaylistService)
  playlist = this.playlistService.playlist;
  
  removeVideo(videoId: string) {
  const pseudo = this.authService.currentUser()?.pseudo ?? '';
  this.playlistService.removeVideo(videoId, pseudo);
}
}
