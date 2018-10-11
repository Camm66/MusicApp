import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/RX';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  static BASE_URL = 'https://api.spotify.com/v1';

  constructor(private http: Http) { }

  query(URL: string, params?: Array<string>): Observable<any[]> {
    let queryURL = `${SpotifyService.BASE_URL}${URL}`;
    if(params) {
      queryURL = `${queryURL}?${params.join('&')}`;
    }
    const apiKey = environment.spotifyApiKey;
    const headers = new Headers({
      Authorization: `Bearer ${apiKey}`
    });
    const options = new RequestOptions({
      headers: headers
    });
    return this.http.request(queryURL, options).map((res:any) => res.json());
  }

  search(query: string, type: string): Observable<any[]> {
    return this.query('/search', [`q=${query}`, `type=${type}`]);
  }

  searchTrack(query: string): Observable<any[]>{
    return this.search(query, 'track');
  }

   getTrack(id: string): Observable<any[]> {
    return this.query(`/tracks/${id}`);
  }

  getAlbum(id: string): Observable<any[]>{
    return this.query(`/albums/${id}`);
  }

  getAlbumTracks(id: string): Observable<any[]>{
    return this.query(`/albums/${id}/tracks`);
  }
}

export const SPOTIFY_PROVIDERS: Array<any> = [
  { provide: SpotifyService, useClass: SpotifyService }
];
