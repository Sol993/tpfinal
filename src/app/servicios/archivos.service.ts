import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, Observable } from 'rxjs';
import { Fileupload } from '../clases/fileupload';

@Injectable({
  providedIn: 'root'
})
export class ArchivosService {
  private basePath = '/uploads';

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) { }

  pushFileToStorage(fileUpload: Fileupload): Observable<number | undefined> {
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          this.saveFileData(fileUpload);
        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();
  }

  private saveFileData(fileUpload: Fileupload): void {
    this.db.list(this.basePath).push(fileUpload);
  }

  /*getFileByUrl(url: string): Fileupload {
    return this.storage.ref(this.basePath)
  }*/

  getFiles(numberItems: number): AngularFireList<Fileupload> {
    return this.db.list(this.basePath, ref =>
      ref.limitToLast(numberItems));
  }
}
