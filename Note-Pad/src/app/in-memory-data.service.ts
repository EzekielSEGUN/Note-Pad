import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Note } from './notes/note';
@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const notes = [
      { id: 11, name: 'Learn Angular js' },
      { id: 12, name: 'see a movie' },
      { id: 13, name: 'Learn to ride a bicycle ' },
      { id: 14, name: 'read a book' },
      { id: 15, name: 'go to the mall ' },
      { id: 16, name: 'fix my car' },
      { id: 17, name: 'build an app' },
      { id: 18, name: 'take a walk ' },
      { id: 19, name: 'attend a party ' },
      { id: 20, name: 'pick Dan From school ' }
    ];
    return {notes};
  }

 
  genId(notes: Note[]): number {
    return notes.length > 0 ? Math.max(...notes.map(note => note.id)) + 1 : 11;
  }
}