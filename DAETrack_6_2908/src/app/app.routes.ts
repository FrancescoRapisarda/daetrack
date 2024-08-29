import { Routes } from '@angular/router';
import { SiteLayoutComponent } from './layouts/site-layout/site-layout.component';
import { LeafletMapComponent } from './components/leaflet-map/leaflet-map.component';
import { DaeCardComponent } from './components/dae-card/dae-card.component';

export const routes: Routes = [
    {
        path: '', 
        component: SiteLayoutComponent, 
        children: [
        { 
            path: '', 
            component: LeafletMapComponent,
            children: [
                { 
                    path: '', 
                    component: DaeCardComponent
                }
            ]
        }
        ]
    }
];
