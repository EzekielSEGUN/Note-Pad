import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


import { MessageService } from './message.service';
import { Note } from './notes/note';


@Injectable({ providedIn: 'root' })
export class NoteService {

  private notesUrl = 'api/notes';  

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

 
  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.notesUrl)
      .pipe(
        tap(_ => this.log('fetched Notes')),
        catchError(this.handleError<Note[]>('getNotes', []))
      );
  }


  getNoteNo404<Data>(id: number): Observable<Note> {
    const url = `${this.notesUrl}/?id=${id}`;
    return this.http.get<Note[]>(url)
      .pipe(
        map(notes => notes[0]), 
        tap(n => {
          const outcome = n ? `fetched` : `did not find`;
          this.log(`${outcome} note id=${id}`);
        }),
        catchError(this.handleError<Note>(`getNote id=${id}`))
      );
  }

  
  getNote(id: number): Observable<Note> {
    const url = `${this.notesUrl}/${id}`;
    return this.http.get<Note>(url).pipe(
      tap(_ => this.log(`fetched note id=${id}`)),
      catchError(this.handleError<Note>(`getNote id=${id}`))
    );
  }

 
  searchNotes(term: string): Observable<Note[]> {
    if (!term.trim()) {
     
      return of([]);
    }
    return this.http.get<Note[]>(`${this.notesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found notes matching "${term}"`) :
         this.log(`no notes matching "${term}"`)),
      catchError(this.handleError<Note[]>('searchNotes', []))
    );
  }

  
  addNote(note: Note): Observable<Note> {
    return this.http.post<Note>(this.notesUrl, note, this.httpOptions).pipe(
      tap((newNote: Note) => this.log(`added note w/ id=${newNote.id}`)),
      catchError(this.handleError<Note>('addNote'))
    );
  }

 
  deleteNote(id: number): Observable<Note> {
    const url = `${this.notesUrl}/${id}`;

    return this.http.delete<Note>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted note id=${id}`)),
      catchError(this.handleError<Note>('deleteNote'))
    );
  }

  
  updateNote(note: Note): Observable<any> {
    return this.http.put(this.notesUrl, note, this.httpOptions).pipe(
      tap(_ => this.log(`updated note id=${note.id}`)),
      catchError(this.handleError<any>('updateNote'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation 
   * @param result 
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      
      console.error(error);

      
      this.log(`${operation} failed: ${error.message}`);

      
      return of(result as T);
    };
  }

 
  private log(message: string) {
    this.messageService.add(`NoteService: ${message}`);
  }
}