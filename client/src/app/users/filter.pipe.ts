import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: 'filterBy'
})
export class FilterBy implements PipeTransform {
    private filterByString(filter){
        filter = filter.toLowerCase();
        return value => {
            return !filter || value.toLowerCase().indexOf(filter) !== -1;
        }
    }

    private filterByBoolean(filter: string) {
        let booleanVal;
        if (filter === 'true') {
            booleanVal = true;
        } else if (filter === 'false') {
            booleanVal = false;
        } else {
            throw new TypeError("The string's content should be either 'true' or 'false'");
        }
        return value => {
            return booleanVal === value;
        }
    }

  private filterByObject(filter) {
    return value => {
      for (let key in filter) {
        if (!value.hasOwnProperty(key)) {
          return false;
        }
          if (filter[key] == null){
              continue;
          }

        const type = typeof value[key];
        let isMatching;

        if (type === 'string') {
          isMatching = this.filterByString(filter[key])(value[key]);
        } else if (type === 'object') {
          isMatching = this.filterByObject(filter[key])(value[key]);
        } else if (type === 'boolean') {
          isMatching = this.filterByBoolean(filter[key])(value[key]);
        } else {
          isMatching = this.filterDefault(filter[key])(value[key]);
        }

        if (!isMatching) {
          return false;
        }
      }

      return true;
    }
  }

  /**
   * Defatul filterDefault function
   *
   * @param filter
   * @returns {(value:any)=>boolean}
   */
  private filterDefault(filter) {
    return value => {
      return !filter || filter == value;
    }
  }

  transform(array: any[], filter: string): any {
    if(array==null){
        return null;
    }
    const type = typeof filter;

    if(type === 'string'){
        console.log("IMA STRING! WUTTTTT!");
        return array.filter(this.filterByString(filter));
    }

    if(type == 'object'){
        return array.filter(this.filterByObject(filter));
    } else {
        console.log("Unknown filter type???");
        console.log(type);
        console.log(filter);
        return array;
    }
  }
}
