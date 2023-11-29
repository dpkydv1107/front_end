import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmpassword: string = '';

  constructor(private supabase: SupabaseService, private router: Router) {}

  ngOnInit() {}

  async onSignup() {
    
    if (this.password !== this.confirmpassword) {
      console.error('Passwords do not match');
      alert('Passwords do not match. Please enter matching passwords.');
      return;
    }

    // Additional validation logic can be added here before signing up
    const isEmailValid = this.validateEmail(this.email);
    if (!isEmailValid) {
      console.error('Invalid email format');
      alert('Please enter a valid email address.');
      return;
    }

    if (this.password.length < 8) {
      console.error('Password length is less than 8 characters');
      alert('Password should be at least 8 characters long.');
      return;
    }

    const { data, error } = await this.supabase.signUp(this.email, this.password);

    if (error) {
      console.error('Error signing up:', error.message);
      // You might want to provide a more user-friendly error message here
    } else {
      console.log('User registered successfully:', data);
      this.router.navigate(['/login']);
    }
  }

  // Function to validate email format
  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return emailRegex.test(email);
  }
}
