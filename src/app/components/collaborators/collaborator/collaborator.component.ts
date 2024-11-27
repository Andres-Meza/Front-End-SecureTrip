import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { CollaboratorsService } from '../../../services/collaborators.service';
import { LanguagesService } from '../../../services/languages.service';
import { CitiesService } from '../../../services/cities.service';
import { CountriesService } from '../../../services/countries.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collaborator',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './collaborator.component.html',
  styleUrl: './collaborator.component.css'
})
export class CollaboratorComponent implements OnInit {
  cities: any[] = [];
  countries: any[] = [];
  languages: any[] = [];
  collaborator = {
    FirstName: '',
    LastName: '',
    Email: '',
    TypeCollaborator: '',
    CountryID: '',
    CityID: '',
    LanguageID: '',
    Specialty: '',
    CompetencyLevel: '',
    LicenseType: '',
  };

  constructor(
    private collaboratorService: CollaboratorsService,
    private countryService: CountriesService,
    private languageService: LanguagesService,
    private cityService: CitiesService,
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
    this.collaboratorService.createCollaborator(this.collaborator).subscribe(
      (createdCollaborator) => {
        Swal.fire('¡Colaborador Creado!', 'El colaborador ha sido creado correctamente.', 'success');
        this.router.navigate(['/collaborators-list']);
      },
      (error) => {
        Swal.fire('Error', 'Hubo un error al crear el colaborador.', 'error');
        console.error('Error creando colaborador:', error);
      }
    );
  }
}
