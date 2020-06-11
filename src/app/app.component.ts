import { Component,OnInit,Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import{ ShiftGroupService} from '../service/shift-group-service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'shift-group-app';
 
  shifts:any ;
  groups:any ;
  form: FormGroup;
  selectedShift;
  selectedGroup;
  success;
  failure;
  @Input() group;
  @Input() shift;

  ngOnInit()
  {
    this.shifts = this.getShifts();
    this.groups=this.getGroups();
  }
  constructor(private formBuilder: FormBuilder,private shiftGroupService:ShiftGroupService ) {
    this.form = this.formBuilder.group({
      shifts: ['Select Shift'],
      groups: ['Select Group']
    });
  }

  createShift()
  {
    this.shiftGroupService.createShift(this.shift).subscribe( 
      response => {
        console.log(response);
          this.success="Created Successfully";
          this.shifts = this.getShifts();
          this.groups=this.getGroups();
      }, error => {
        this.failure="Failed";
    }
  ); 
  }
  createGroup()
  {
    this.shiftGroupService.createGroup(this.group).subscribe( 
      response => {
        console.log(response);
          this.success="Created Successfully";
          this.shifts = this.getShifts();
          this.groups=this.getGroups();
          
      }, error => {
        this.failure="Failed";
    }
  ); 
  }
  getShifts() {
    return this.shiftGroupService.getShifts().subscribe( 
      response => {
        console.log(response);
        this.selectedShift=response[0].code;
        return this.shifts=response;
        
      }, error => {
        console.log(error);
    }
  ); 
  
}
getGroups() {
    return this.shiftGroupService.getGroups().subscribe( 
      response => {
        console.log(response);
        this.selectedGroup=response[0].code;
        return this.groups=response;
      }, error => {
        console.log(error);
    }
  ); 
    }
    selectShiftChangeHandler(event: any){
      this.selectedShift = event.target.value;
    }
    selectGroupChangeHandler(event: any){
      this.selectedGroup = event.target.value;
    }
  submit(event) { 
    if(event==="Search")
    {
     this.shiftGroupService.checkShiftBelongsToGroup(this.selectedShift,this.selectedGroup).subscribe( 
        response => {  
          console.log(response);
            this.success=response['message'];
        }, error => {
          this.success=error['message'];
      }
    ); 
    }
    else{
      this.shiftGroupService.addShiftToGroup(this.selectedShift,this.selectedGroup).subscribe( 
         response => {
        console.log(response);
          this.success="Created Successfully";
      }, error => {
        this.failure="Failed";
      }
    ); 
    }
   }
  
}
