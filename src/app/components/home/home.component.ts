import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { LeftPanelComponent } from '../left-panel/left-panel.component';
import { MiddlePanelComponent } from '../middle-panel/middle-panel.component';
import { RightPanelComponent } from '../right-panel/right-panel.component';

@Component({
  selector: 'app-home',
  imports: [
    NavbarComponent,
    LeftPanelComponent,
    MiddlePanelComponent,
    RightPanelComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  isRightPanelCollapsed = false;

  onRightPanelToggle(collapsed: boolean) {
    this.isRightPanelCollapsed = collapsed;
  }
}
