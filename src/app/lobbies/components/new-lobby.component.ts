import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LobbyService } from '../../services/lobby.service';

@Component({
  selector: 'app-new-lobby',
  templateUrl: '../views/new-lobby.component.html',
  // styleUrls: ['./login.component.css']
})
export class NewLobbyComponent implements OnInit {
  newGroupForm: FormGroup;

  servers: string[] = [
    'Agride', 'Beta test', 'Djaul', 'Écho', 'Goultard', 'Hel Munster', 'Illyazelle',
    'Julith', 'Mériana', 'Merkator', 'Mylaise', 'Nidas', 'Pandore', 'Ush'
  ];

  constructor(private lobbyService: LobbyService, private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.newGroupForm = this.fb.group({
      name: ['', Validators.required],
      minp: ['', Validators.required],
      maxp: ['', Validators.required],
      levelp: ['', Validators.required],
      range: ['', Validators.required],
      server: ['', Validators.required],
      fight_type: ['', Validators.required]
    });
  }

  onNewGroupSubmit(): void {
    let group: any = this.newGroupForm.value;
    this.lobbyService.createGroup(group).subscribe(
      data => {
        this.newGroupForm.reset()
        let group_status = localStorage.setItem('grp_status', JSON.stringify(true));
        this.router.navigate([`/groups/${data['group_id']}`]);
      }
    );
  }
}
