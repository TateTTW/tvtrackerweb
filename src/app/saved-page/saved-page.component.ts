import { Component, OnInit } from '@angular/core';
import {TvTrackerService} from "../tv-tracker.service";

@Component({
  selector: 'saved-page',
  templateUrl: './saved-page.component.html',
  styleUrls: ['./saved-page.component.less']
})
export class SavedPageComponent implements OnInit {

  panels: any = [];

  constructor(private service: TvTrackerService) { }

  ngOnInit(): void {

  }

  async getSaved() {
    const username = window.sessionStorage.getItem("TvTrackerUsername");
    const token = window.sessionStorage.getItem("TvTrackerToken");
    if (username && token) {
      const savedMediaItems = await this.service.getSaved(username, token).toPromise();
      this.buildPanels(savedMediaItems ?? []);
    }
  }

  private buildPanels(items: SavedMediaItem[]) {
    const panels = [];
    let row = 0;
    let col = 0;

    for (let item of items) {
      if (col > 4) {
        col = 0;
        row += 1;
      }

      panels.push(
        { "sizeX": 1, "sizeY": 1, "row": row, "col": col++, "content": `<img style="height: 100%; width: 100%" src="${item.imageUrl}"/>` }
      );
    }
    this.panels = panels;
  }
}

interface SavedMediaItem {
  id: number,
  title: string,
  type: string,
  platform: string,
  description: string,
  imageUrl: string,
  watched: boolean
  username: string
}
