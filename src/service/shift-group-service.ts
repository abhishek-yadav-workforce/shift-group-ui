import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable()
export class ShiftGroupService {
    constructor(public httpService: HttpClient){

    }
    getShifts() {
        return this.httpService.get("http://localhost:8080/shiftgrouping/shifts");
      }
    getGroups() {
        return this.httpService.get("http://localhost:8080/shiftgrouping/groups");
      }
     checkShiftBelongsToGroup(shiftCode,groupCode) {
        return this.httpService.get(`http://localhost:8080/shiftgrouping/checkshiftgroups/${shiftCode}/${groupCode}`);
     }
     addShiftToGroup(shiftCode,groupCode) {
      return this.httpService.put(`http://localhost:8080/shiftgrouping/${shiftCode}/${groupCode}`,{});
   }
     createShift(shiftCode)
     {
         debugger
        return this.httpService.put(`http://localhost:8080/shiftgrouping/shifts/${shiftCode}`,{});
     } 
     createGroup(groupCode)
     {
        return this.httpService.put(`http://localhost:8080/shiftgrouping/groups/${groupCode}`,{});
     }
}