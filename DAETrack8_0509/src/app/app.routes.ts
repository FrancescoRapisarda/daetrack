import { Routes } from '@angular/router';
import { SiteLayoutComponent } from './layouts/site-layout/site-layout.component';
import { LeafletMapComponent } from './components/leaflet-map/leaflet-map.component';
import { RegistrationComponent } from './components/registration/registration.component';

export const routes: Routes = [
    {
        path: '',
        component: SiteLayoutComponent, 
        children: [
            { 
                path: '', 
                component: LeafletMapComponent
            }
        ]
    },
    {
        path: 'registration', 
        component: RegistrationComponent
    },
];

