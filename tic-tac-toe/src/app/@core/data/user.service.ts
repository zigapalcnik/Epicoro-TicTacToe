import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoggerFactory } from '../log/logger-factory';
import { v4 as uuidv4 } from 'uuid';

export class User {
  id: string;
  username: string;
  constructor() {
    this.id = uuidv4()
    this.username = 'New user';
  }
}

@Injectable()
export class UserService {
  private static logger = LoggerFactory.getLogger(UserService.name);

  constructor(private db: AngularFirestore) {
  }

  createNew(user: User): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.db
        .collection('User')
        .add(user)
        .then(
          res => {
            localStorage.setItem('currentUser', JSON.stringify(user));
            UserService.logger.info(`User ${ user.username } registered`);
          },
          err => {
            UserService.logger.info(`Error ${ err } occurred`)
          });
    });
  }
}
