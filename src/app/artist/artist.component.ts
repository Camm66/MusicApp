import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SpotifyService } from '../spotify.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {
  id: string;
  artist: Object;
  topTracks: Object;

  constructor(private route: ActivatedRoute, private spotify: SpotifyService,
              private location: Location) {
    route.params.subscribe(params => { this.id = params['id']; });
  }

  ngOnInit(): void {
    this.spotify
    .getArtist(this.id)
    .subscribe((res: any) => this.renderArtist(res));

    this.spotify
    .getTopTracks(this.id)
    .subscribe((res: any) => this.renderTopTracks(res));
  }


  back(): void {
    this.location.back();
  }

  renderArtist(res: any): void {
    this.artist = res;
  }

  renderTopTracks(res: any): void {
    this.topTracks = res.tracks;
  }

}
