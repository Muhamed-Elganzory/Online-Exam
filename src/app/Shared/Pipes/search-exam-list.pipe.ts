import { Pipe, PipeTransform } from '@angular/core';
import {Exams} from '../../Features/Exams/Model/exams';

@Pipe({
  name: 'searchExamList'
})
export class SearchExamListPipe implements PipeTransform {

  transform(examList: Exams[], searchTerm: string): Exams [] {
    return examList.filter((item: Exams): boolean => item.title.toLowerCase().includes(searchTerm));
  }
}
