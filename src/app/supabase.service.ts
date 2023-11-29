import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  auth: any;
  constructor(private supabase: SupabaseClient) {
    this.supabase = createClient("https://fnunkvnscsrfuxgvmoaa.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZudW5rdm5zY3NyZnV4Z3Ztb2FhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk0MTg1MjIsImV4cCI6MjAxNDk5NDUyMn0.WarOqCnfHjYcYdglm-gk0vUvNiROVVDiIMUDvtWxa3Q");
  } 
  async checkExistingEmail(email: string) {
    const { data, error } = await this.supabase
      .from('users')
      .select('id')
      .eq('email', email);

    return data && data.length > 0;
  }
  
  async signUp(email: string, password: string): Promise<{ data: any; error: any }> {
    const emailExists = await this.checkExistingEmail(email);
    if (emailExists) {
      return { data: null, error: { message: 'Email already in use' } };
    }
    return await this.supabase.auth.signUp({ email, password });
  }
  async signIn(email:string,password:string){
    const {data,error}= await this.supabase.auth.signInWithPassword({
      email,
      password,
    });
    return{data,error}

  }
}
  
