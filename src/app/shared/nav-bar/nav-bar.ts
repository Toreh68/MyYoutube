import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router, RouterLink } from '@angular/router';
import { PlaylistService } from '../../services/playlist';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar {
  authService = inject(AuthService)
  router = inject(Router)
  currentUser = this.authService.currentUser
  playlistService = inject(PlaylistService)

  showMenu = signal(false);


  logout() {
    this.authService.logout();
    this.playlistService.playlist.set([]);
    this.router.navigate(['/auth']);
  }
}
