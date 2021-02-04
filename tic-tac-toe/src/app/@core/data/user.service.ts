import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoggerFactory } from '../log/logger-factory';

export class User {
  id: string;
  username: string;
  constructor() {
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
            UserService.logger.info(`User ${ user.username } registered`);
          },
          err => {
            UserService.logger.info(`Error ${ err } occurred`)
          });
    });
  }
}
