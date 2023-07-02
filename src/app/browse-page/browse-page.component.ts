import { Component, OnInit } from '@angular/core';
import {TvTrackerService} from "../tv-tracker.service";

@Component({
  selector: 'browse-page',
  templateUrl: './browse-page.component.html',
  styleUrls: ['./browse-page.component.less']
})
export class BrowsePageComponent implements OnInit {

  response: Response = { Search: [], totalResults: '0', Response: 'True'}

  panels: any = [];

  constructor(private service: TvTrackerService) { }

  ngOnInit(): void {
    this.search({ text: "Movie", isMovie: true });
  }

  async search(param: { text: string; isMovie: boolean }) {
    const type = param.isMovie ? 'movie' : 'series';
    try {
      this.response = await this.service.browse(param.text, type, 1).toPromise();
      this.buildPanels(this.response);
    } catch (e) {
      console.log(e);
    }
  }

  private buildPanels(response: Response) {
    const panels = [];
    let row = 0;
    let col = 0;

    for (let item of response.Search ?? []) {
      if (col > 4) {
        col = 0;
        row += 1;
      }

      panels.push(
        { "sizeX": 1, "sizeY": 1, "row": row, "col": col++, "content": `<img style="height: 100%; width: 100%" src="${item.Poster}"/>` }
      );
    }
    this.panels = panels;
  }
}

interface Response {
  Search: MediaItem[],
  totalResults: string
  Response: string
}

interface MediaItem {
  Poster: string,
  Title: string,
  Type: string,
  Year: string,
  imdbId: string
}
