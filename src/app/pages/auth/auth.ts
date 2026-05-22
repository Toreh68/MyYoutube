import { Component, inject, signal, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaylistService } from '../../services/playlist';



@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth implements OnInit {

  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)
  private readonly route = inject(ActivatedRoute)
  private readonly playlistService = inject(PlaylistService)



  ngOnInit() {
    this.route.queryParams.subscribe(params => {
    if (params['tab'] === 'register') {
      this.activeTab.set('register');
    }else { this.activeTab.set('login') }
  });
  }

  activeTab = signal<'login' | 'register'>('login');

  // Getters loginForm
get loginPseudo() { return this.loginForm.get('pseudo'); }
get loginPassword() { return this.loginForm.get('password'); }

// Getters registerForm
get registerPseudo() { return this.registerForm.get('pseudo'); }
get registerEmail() { return this.registerForm.get('email'); }
get registerPassword() { return this.registerForm.get('password'); }


loginForm = new FormGroup({
  pseudo: new FormControl('', Validators.required),
  password: new FormControl('', [Validators.required, Validators.minLength(6)])
});

registerForm = new FormGroup({
  pseudo: new FormControl('', Validators.required),
  email: new FormControl('', [Validators.required, Validators.email]),
  password: new FormControl('', [Validators.required, Validators.minLength(6)])
});
  error = signal('');


  onLogin() {
    const pseudo = this.loginForm.value.pseudo ?? '';
    const password = this.loginForm.value.password ?? '';
    const ok = this.authService.login(pseudo, password);
    if (ok) {
      this.router.navigate(['/search'])
    this.playlistService.loadPlaylist(pseudo)
    }else {
       this.error.set('Identifiants incorrects');
    }
   
  }

  onRegister() {
    if (this.registerForm.invalid) return;
    const pseudo = this.registerForm.value.pseudo ?? '';
    const email = this.registerForm.value.email ?? '';
    const password = this.registerForm.value.password ?? '';
    this.authService.register(pseudo, email, password);
    this.router.navigate(['/search'])
    this.playlistService.loadPlaylist(pseudo)
    
}
}
