import { Pipe, PipeTransform } from '@angular/core';
import {Subject} from '../../Features/Subjects/Model/subject';

@Pipe({
  name: 'searchSubjectList'
})
export class SearchSubjectListPipe implements PipeTransform {

  transform(subjectList: Subject[], searchTerm: string): Subject[] {
    return subjectList.filter((subject: Subject): boolean => subject.name.toLowerCase().includes(searchTerm));
  }
}
