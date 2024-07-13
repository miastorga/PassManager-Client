import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  // Set a key-value pair in local storage
  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  // Get a value from local storage by key
  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  // Remove an item from local storage by key
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  // Clear all items in local storage
  clear(): void {
    localStorage.clear();
  }

  // Set an object in local storage after stringifying it
  setObject(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Get an object from local storage and parse it
  getObject<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

}
