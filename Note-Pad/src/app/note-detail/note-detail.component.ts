import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


import { NoteService } from '../note.service';
import { Note } from '../notes/note';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: [ './note-detail.component.css' ]
})
export class NoteDetailComponent implements OnInit {
  note: Note | undefined;

  constructor(
    private route: ActivatedRoute,
    private noteService: NoteService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getNote();
  }

  getNote(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.noteService.getNote(id)
      .subscribe(note => this.note = note);
  }

  goBack(): void {
    this.location.back();
  }


  save(): void {
    if (this.note) {
      this.noteService.updateNote(this.note)
        .subscribe(() => this.goBack());
    }
  }


}