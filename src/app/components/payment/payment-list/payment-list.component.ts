import { Component, OnInit } from '@angular/core';
import { PaymentsService } from '../../../services/payments.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientsService } from '../../../services/clients.service';
import { ServicesService } from '../../../services/services.service';

@Component({
  selector: 'app-payment-list',
  imports: [ CommonModule, FormsModule ],
  templateUrl: './payment-list.component.html',
  styleUrl: './payment-list.component.css'
})
export class PaymentListComponent implements OnInit {
  payments: any[] = [];
  clients: any[] = [];
  services: any[] = [];
  errorMessage: string = '';

  constructor(
    private paymentService: PaymentsService,
    private clientService: ClientsService,
    private serviceService: ServicesService,
  ) {}

  ngOnInit(): void {
    this.loadPayments();
    this.loadClient(),
    this.loadServices();
  }

  loadPayments(): void {
    this.paymentService.getPayments().subscribe(
      (data) => {
        this.payments = data;
      },
      (error) => {
        this.errorMessage = 'Error al cargar los pagos';
      }
    );
  }

  loadClient() {
    this.clientService.getClients().subscribe(data => {
      this.clients = data;
    });
  }

  loadServices() {
    this.serviceService.getServices().subscribe(data => {
      this.services = data;
    });
  }
}
