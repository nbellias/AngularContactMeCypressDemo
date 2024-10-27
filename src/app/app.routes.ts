import { Routes } from '@angular/router';
import { ContactMeComponent } from './contact-me/contact-me.component';

export const routes: Routes = [
    {
        path: '**',
        component: ContactMeComponent,
    },
];
