import {Component, OnInit, ViewChild} from '@angular/core';
import {TvTrackerService} from "../tv-tracker.service";
import {SavedPageComponent} from "../saved-page/saved-page.component";

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.less']
})
export class MainPageComponent implements OnInit {
  @ViewChild(SavedPageComponent) private savedPage?: SavedPageComponent;

  constructor(private service: TvTrackerService) { }

  ngOnInit(): void {
  }

  async login(param: { username: string; password: string }) {
    try {
      const token = await this.service.login(param.username, param.password).toPromise();
      window.sessionStorage.setItem("TvTrackerToken", token);
      window.sessionStorage.setItem("TvTrackerUsername", param.username);
      this.savedPage?.getSaved();
    } catch (e) {
      console.log(e);
    }
  }
}
