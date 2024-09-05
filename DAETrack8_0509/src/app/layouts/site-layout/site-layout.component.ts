import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { LeafletMapComponent } from "../../components/leaflet-map/leaflet-map.component";

@Component({
  selector: 'app-site-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, LeafletMapComponent],
  templateUrl: './site-layout.component.html',
  styleUrl: './site-layout.component.scss'
})
export class SiteLayoutComponent {

}
