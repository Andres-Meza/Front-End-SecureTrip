import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClientsService } from '../../../services/clients.service';
import { CountriesService } from '../../../services/countries.service';
import { LanguagesService } from '../../../services/languages.service';
import { CitiesService } from '../../../services/cities.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientedit',
  imports: [ CommonModule, FormsModule ],
  templateUrl: './clientedit.component.html',
  styleUrl: './clientedit.component.css'
})
export class ClienteditComponent implements OnInit {
  countries: any[] = [];
  cities: any[] = [];
  languages: any[] = [];
  client = {
    FirstName: '',
    LastName: '',
    Email: '',
    Password: '',
    CountryID: '',
    CityID: '',
    LanguageID: '',
    BirthDate: '',
  };

  clientID: number | null = null;

  constructor(
    private clientService: ClientsService,
    private countryService: CountriesService,
    private cityService: CitiesService,
    private languageService: LanguagesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.clientID = +id;
    }

    if (this.clientID) {
      this.loadClient();
    }
    this.loadCountries();
    this.loadCities();
    this.loadLanguages();
  }

  loadClient(): void {
    if (this.clientID !== null) {
      this.clientService.getClientByID(this.clientID).subscribe((data) => {
        this.client = data;
      });
    }
  }

  loadCountries(): void {
    this.countryService.getCountries().subscribe((data) => {
      this.countries = data;
    });
  }

  loadCities(): void {
    this.cityService.getCities().subscribe((data) => {
      this.cities = data;
    });
  }

  loadLanguages(): void {
    this.languageService.getLanguages().subscribe((data) => {
      this.languages = data;
    });
  }

  onSubmit(): void {
    if (this.clientID !== null) {
      this.clientService.updateClient(this.clientID, this.client).subscribe(
        response => {  
          Swal.fire('¡Cliente Actualizado!', 'El cliente ha sido actualizado correctamente.', 'success');  
          this.router.navigate(['/clients-list']);  
      }, error => {  
          Swal.fire('Error', 'Hubo un error al actualizar el cliente.', 'error');  
          console.error('Error actualizando cliente:', error);  
      });  
    }
  }
}
