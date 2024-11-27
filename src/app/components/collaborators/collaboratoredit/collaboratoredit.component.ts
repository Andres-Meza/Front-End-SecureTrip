import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { CollaboratorsService } from '../../../services/collaborators.service';
import { LanguagesService } from '../../../services/languages.service';
import { CitiesService } from '../../../services/cities.service';
import { CountriesService } from '../../../services/countries.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-collaboratoredit',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './collaboratoredit.component.html',
  styleUrl: './collaboratoredit.component.css'
})
export class CollaboratoreditComponent implements OnInit {
  countries: any[] = [];
  cities: any[] = [];
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
  collaboratorID: number | null = null;

  constructor(
    private collaboratorService: CollaboratorsService,
    private countryService: CountriesService,
    private cityService: CitiesService,
    private languageService: LanguagesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.collaboratorID = +id;
    }

    if (this.collaboratorID) {
      this.loadCollaborator();
    }
    this.loadCountries();
    this.loadCities();
    this.loadLanguages();
  }

  loadCollaborator(): void {
    if (this.collaboratorID !== null) {
      this.collaboratorService.getCollaboratorByID(this.collaboratorID).subscribe((data) => {
        this.collaborator = data;
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
    if (this.collaboratorID !== null) {
      this.collaboratorService.updateCollaborator(this.collaboratorID, this.collaborator).subscribe(
        (updatedCollaborator) => {
          Swal.fire('¡Colaborador Actualizado!', 'El colaborador ha sido actualizado correctamente.', 'success');
          this.router.navigate(['/collaborators-list']);
        },
        (error) => {
          Swal.fire('Error', 'Hubo un error al actualizar el colaborador.', 'error');
          console.error('Error actualizando colaborador:', error);
        }
      );
    }
  }
}
