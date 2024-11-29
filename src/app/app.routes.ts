import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home/home.component';
import { CitylistComponent } from './components/cities/citylist/citylist.component';
import { CountrylistComponent } from './components/countries/countrylist/countrylist.component';
import { LanguagelistComponent } from './components/languages/languagelist/languagelist.component';
import { CollaboratorComponent } from './components/collaborators/collaborator/collaborator.component';
import { CollaboratoreditComponent } from './components/collaborators/collaboratoredit/collaboratoredit.component';
import { CollaboratorlistComponent } from './components/collaborators/collaboratorlist/collaboratorlist.component';
import { ClienteditComponent } from './components/clients/clientedit/clientedit.component';
import { ClientComponent } from './components/clients/client/client.component';
import { ClientlistComponent } from './components/clients/clientlist/clientlist.component';
import { TransportServicesComponent } from './components/transport-services/transport-services.component';
import { AuthLoginComponent } from './components/auth-login/auth-login.component';
import { ServicesListComponent } from './components/services/services-list/services-list.component';
import { ServicesComponent } from './components/services/services/services.component';
import { ServiceseditComponent } from './components/services/servicesedit/servicesedit.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PaymentComponent } from './components/payment/payment/payment.component';
import { PaymentListComponent } from './components/payment/payment-list/payment-list.component';

export const routes: Routes = [
	{ path: '', redirectTo: '', pathMatch: 'full' },
	{ path: '', component: HomeComponent },
	{ path: 'countries', component: CountrylistComponent },
	{ path: 'cities', component: CitylistComponent },
	{ path: 'language', component: LanguagelistComponent},
	{ path: 'collaborators-add', component: CollaboratorComponent },
	{ path: 'collaborators-edit/:id', component: CollaboratoreditComponent },
	{ path: 'collaborators-list', component: CollaboratorlistComponent },
	{ path: 'clients-add', component: ClientComponent },
	{ path: 'clients-list', component: ClientlistComponent },
	{ path: 'clients-edit/:id', component: ClienteditComponent},
	{ path: 'transport-services', component: TransportServicesComponent},
	{ path: 'login', component: AuthLoginComponent},
	{ path: 'services-add', component: ServicesComponent},
	{ path: 'services-list', component: ServicesListComponent},
	{ path: 'services-edit/:id', component: ServiceseditComponent},
	{ path: 'dashboard', component: DashboardComponent},
	{ path: 'payment-add', component: PaymentComponent},
	{ path: 'payment-list', component: PaymentListComponent},


];