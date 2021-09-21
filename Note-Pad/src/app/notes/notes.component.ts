import { Component, OnInit } from '@angular/core';

import { NoteService } from '../note.service';
import { Note } from './note';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notes: Note[] = [];

  constructor(private noteService: NoteService) { }

  ngOnInit() {
    this.getNotes();
  }

  getNotes(): void {
    this.noteService.getNotes()
    .subscribe(notes => this.notes = notes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.noteService.addNote({ name } as Note)
      .subscribe(note => {
        this.notes.push(note);
      });
  }

  delete(note: Note): void {
    this.notes = this.notes.filter(n => n !== note);
    this.noteService.deleteNote(note.id).subscribe();
  }



}
