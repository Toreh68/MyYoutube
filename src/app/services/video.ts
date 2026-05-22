import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  private readonly http = inject(HttpClient);
  private readonly apiKey = environment.youtubeApiKey;
  private readonly apiUrl = 'https://www.googleapis.com/youtube/v3/search';

  query = signal('');
  results = signal<any[]>([]);
  loading = signal(false);

  searchHistory = signal<string[]>(JSON.parse(localStorage.getItem('search_history') ?? '[]'))

  search(query: string) {
    return this.http.get(this.apiUrl, {
      params: {
        key: this.apiKey,
        q: query,
        part: 'snippet',
        type: 'video',
        maxResults: '12'
      }
    });
  }

  addToHistory(query: string) {
  const filtered = this.searchHistory().filter(q => q !== query);
  const updated = [query, ...filtered].slice(0, 5);
  this.searchHistory.set(updated);
  localStorage.setItem('search_history', JSON.stringify(updated));
}
}
