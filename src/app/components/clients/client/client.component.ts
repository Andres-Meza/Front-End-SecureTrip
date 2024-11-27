import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClientsService } from '../../../services/clients.service';
import { CountriesService } from '../../../services/countries.service';
import { LanguagesService } from '../../../services/languages.service';
import { CitiesService } from '../../../services/cities.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent implements OnInit {
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
    ClientStatus: 'Activo'
  };

  constructor(
    private clientService: ClientsService,
    private countryService: CountriesService,
    private cityService: CitiesService,
    private languageService: LanguagesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCountries();
    this.loadCities();
    this.loadLanguages();
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
    this.clientService.createClient(this.client).subscribe(
      (createdClient) => {
        Swal.fire('¡Cliente Creado!', 'El cliente ha sido creado correctamente.', 'success');
        this.router.navigate(['/clients-list']);
      },
      (error) => {
        Swal.fire('Error', 'Hubo un error al crear el cliente.', 'error');
        console.error('Error creando cliente:', error);
      }
    );
  }
}
