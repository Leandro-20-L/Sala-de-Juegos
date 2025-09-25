import { Injectable } from '@angular/core';
import {supabase } from "../supabase.client";
import { User, SupabaseClient } from '@supabase/supabase-js';
import { BehaviorSubject } from 'rxjs';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable(); //para exponer el observable
  constructor(private log : LogService) {
     supabase.auth.onAuthStateChange((_event, session) => {
      this.userSubject.next(session?.user || null);
    });
  }

  public async logIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    if(!error && data.user){
      await this.log.RegistraLog(data.user.id,"login",data.user.email!);
    }

    this.userSubject.next(data.user); 
    return data;
  }

   async logOut() {
    await supabase.auth.signOut();
    this.userSubject.next(null); 
  }

  public async getUserUid(): Promise<string | null> {
    const { data, error } = await supabase.auth.getUser();
    if (error) return null;
    return data.user?.id || null;
  }

  public async getUser(): Promise<User | null> {
    
    const { data, error } = await supabase.auth.getUser();
    if (error) return null;
    return data.user;
    
  }

  public getSupabaseInstance(): SupabaseClient {
    return supabase;
  }

  async  signUp(email: string ,password:string){
    const {data, error} = await supabase.auth.signUp({ email, password });
    if(!error && data.user){
      await this.log.RegistraLog(data.user.id,"registro", data.user.email!);
    }

    return {data,error};
  }

  
}
