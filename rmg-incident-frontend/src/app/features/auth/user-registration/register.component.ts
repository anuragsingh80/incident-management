import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../core/auth/auth.service';
import { AuthLayoutComponent } from '../../../shared/auth-layout.component';
import { City, Country, LocationService } from '../../../core/services/location.service';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { ToastService } from '../../../core/services/toast.service';
import { catchError, debounceTime, distinctUntilChanged, filter, of, switchMap } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';


function passwordsMatch(c: AbstractControl): ValidationErrors | null {
  return c.get('password')?.value === c.get('confirmPassword')?.value ? null : {mismatch:true};
}

@Component({
  standalone:true,
  imports:[CommonModule,ReactiveFormsModule,RouterLink,
    MatSelectModule,
    MatProgressSpinnerModule,
   MatCardModule,
  MatSnackBarModule,
    MatIconModule,
    
     
    MatFormFieldModule,MatInputModule,
    MatButtonModule,AuthLayoutComponent],
  
  templateUrl:'./register.component.html',
  styleUrls: ['./register.component.scss']
  
})
export class RegisterComponent implements OnInit{
   form!: FormGroup;
   loading = false;
   success='';
   error='';
 locationLoading = false;
    countries: Country[] = [];
  filteredCities: City[] = [];

   constructor(
    private fb: FormBuilder,
   private authService: AuthService,
   private locationService: LocationService,
   private router: Router,
   private toast: ToastService,
    private  snackBar :  MatSnackBar
  ) {}


   ngOnInit(): void {
    
     this.countries = this.locationService.getCountries();
    
    this.initializeForm();
     this.watchCountryChange();
     this.setupPincodeLookup();
   }

    private watchCountryChange(): void {
    // Listen to changes on the country dropdown control
    this.form.get('country')?.valueChanges.subscribe((selectedCountryCode: string) => {
      const countryElement = this.countries.find(c => c.code === selectedCountryCode);

      if (countryElement) {
        // 1. Auto-fill the corresponding phone dial code
        this.form.get('countryCode')?.setValue(countryElement.phoneCode);
        
        // 2. Fetch and filter the city dropdown list
        this.filteredCities = this.locationService.getCitiesByCountry(selectedCountryCode);
      } else {
        this.form.get('countryCode')?.reset();
        this.filteredCities = [];
      }

      // Reset city field whenever country changes
      //this.form.get('city')?.setValue('');
    });
  }


   private initializeForm(): void {
     this.form = this.fb.group({
      firstName:['',Validators.required],
      lastName:[''],
      email:['',[Validators.required,Validators.email]],
      address:[''],
      city:[''],
      state:[''],
       pincode: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^[0-9]{6}$/
            )
          ]
        ],
      country:[''],
      phoneNo:[''],
      faxNo:[''],
      countryCode:[''],
      mobile:['',Validators.required],
      password:['',[Validators.required,Validators.minLength(8)]],
      confirmPassword:['',Validators.required]},{validators:passwordsMatch}
    );
      this.loading=false;this.error='';this.success='';

 };
  

       onSubmit(): void  {

     if (this.form.invalid) {
      this.markFormGroupTouched(this.form);
      return;
    }
      this.loading=true;
      this.authService.register(this.form.getRawValue()).subscribe({

      next:()=>{
         this.success='Registration successful. Redirecting to login...'
         this.toast.success(this.success);
        setTimeout(()=>this.router.navigate(['/login']),1000);},
        error:(e)=>{
        this.error=e?.error?.message||'Registration failed.';this.loading=false;
         this.toast.error(this.error);
      }
  });

}


  /**
   * Automatically lookup location
   * when a valid 6 digit PIN is entered.
   */
  private setupPincodeLookup(): void {

    this.form
      .get('pincode')
      ?.valueChanges
      .pipe(

        debounceTime(400),

        distinctUntilChanged(),

        filter(
          value =>
            /^[0-9]{6}$/.test(value)
        ),

        switchMap(pincode => {

          this.locationLoading = true;

          return this.locationService
            .getLocationByPincode(pincode)
            .pipe(

              catchError(error => {

                console.error(
                  'Pincode lookup failed',
                  error
                );

                return of(null);
              })
            );
        })

      )
      .subscribe(location => {

        this.locationLoading = false;

        if (!location) {

          this.clearLocation();

          this.snackBar.open(
            'Invalid PIN code or location not found.',
            'Close',
            {
              duration: 4000
            }
          );

          return;
        }

        this.form.patchValue({

          city: location.city,

          state: location.state,

          country: location.country

        });

      });
  }

  private clearLocation(): void {

    this.form.patchValue({

      city: '',

      state: '',

      country: ''

    });
  }

private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
