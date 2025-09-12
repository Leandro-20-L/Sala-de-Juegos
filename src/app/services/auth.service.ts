import { Injectable } from '@angular/core';
import {supabase } from "../supabase.client";
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
    
  }

  public async logIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  }

  public async logOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  public async getUserUid(): Promise<string | null> {
    const { data, error } = await supabase.auth.getUser();
    if (error) return null;
    return data.user?.id || null;
  }

  public getSupabaseInstance(): SupabaseClient {
    return supabase;
  }

  async  signUp(email: string ,password:string){
    return await supabase.auth.signUp({ email, password });
  }
}
