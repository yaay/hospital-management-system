import { Component } from '@angular/core';
import { PatientService } from 'src/app/services/patient.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent {
  patients: any[] = [];
  doctors: any[] = [];

  constructor(private http:HttpClient, private _patientService: PatientService, private doctorService: DoctorService) {}

  appointment = {
    patient_id: '',
    doctor_id: '',
    time: ''
  };


  submitForm() {
    this.http.post('http://localhost:8000/api/appointments', this.appointment)
      .subscribe(
        response => {
          console.log('Appointment created successfully!', response);
          alert('Appointment created successfully!')
          // Reset the form
          this.appointment = {
            patient_id: '',
            doctor_id: '',
            time: ''
          };
        },
        error => {
          console.error('An error occurred while creating the appointment:', error);
          alert('An error occurred while creating the appointment')
        }
      );
  }
  

  ngOnInit() {
    this._patientService.getPatients().subscribe((res)=>{
      this.patients = res.data;
        console.log(this.patients['0'].name);
      });

      this.doctorService.getdoctors().subscribe((res)=>{
        this.doctors = res.data;
        console.log(this.doctors['0'].id)
        });
  }

}

