// Import necessary modules from Angular
import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
// Define the component metadata
@Component({
  selector: 'app-login', // Component selector used in HTML
  templateUrl: './login.component.html', // HTML template file path
  styleUrls: ['./login.component.scss'], // Stylesheet file path
})

// Define the LoginComponent class
export class LoginComponent implements OnInit {

  // Declare and initialize variables for email and password
  email: string = '';
  password: string = '';


  // Constructor to inject the SupabaseService
  constructor(private supabase: SupabaseService,private router:Router,private toastr: ToastrService) { }

  // Lifecycle hook called after the component is initialized
  ngOnInit() {}

  async onLogin() {
    debugger
    try {
      const { data, error } = await this.supabase.signIn(
        this.email,
       this.password
      );  
      if (error) {
        console.error('Error logging in:', error.message);
      } else if (data) {
        console.log('User logged in successfully:', data);
        this.toastr.success('Logged in successfully!', 'Success');
        this.router.navigate(['/dashboard']);
      }
    } catch (err) {
      console.error('Login error:', err);
    }
  }
}
