import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/services/doctor.service';
import { NewDoctorInterface } from 'src/app/interfaces/new-doctor-interface';
@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent {

  doctors: any[] = [];
  addMode = false;

  constructor(private _DoctorService:DoctorService){
    _DoctorService.getdoctors().subscribe((res)=>{
      this.doctors=res.data
      console.log(this.doctors);
    })
  }


    toggleAddMode(): void {
      this.addMode = !this.addMode;
    }
  
    addDoctor(doctorData: NewDoctorInterface): void {
      const newDoctor: NewDoctorInterface = {
        name: doctorData.name,
        email: doctorData.email,
        password: doctorData.password,
        shift_id: doctorData.shift_id,
        department_id: doctorData.department_id,
        phone_number: doctorData.phone_number,
      };
      this._DoctorService.createDoctor(newDoctor).subscribe(newDoctor => {
        this.doctors.push(newDoctor);
        this.toggleAddMode();
      });

      // console.log(patientData)
  }
  }

