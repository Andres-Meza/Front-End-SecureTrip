import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CitylistComponent } from './components/cities/citylist/citylist.component';

export const routes: Routes = [
	{ path: '', redirectTo: '/cities', pathMatch: 'full' }, // Redirige al listado de transportes por defecto
	{ path: 'cities', component: CitylistComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
