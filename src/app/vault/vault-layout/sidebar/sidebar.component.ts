import { Component } from '@angular/core';
import { SafeBoxComponent } from '../../safe-box/safe-box.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SafeBoxComponent, HeaderComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

}
