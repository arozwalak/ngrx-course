import { ChangeDetectionStrategy, Component, inject, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Course } from "../model/course";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { Update } from "@ngrx/entity";
import { Store } from "@ngrx/store";
import { AppState } from "../../reducers";
import { CourseEntityService } from "../services/course-entity.service";

@Component({
  selector: "course-dialog",
  templateUrl: "./edit-course-dialog.component.html",
  styleUrls: ["./edit-course-dialog.component.css"],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditCourseDialogComponent {
  form: FormGroup;
  dialogTitle: string;
  course: Course;
  mode: "create" | "update";
  loading$: Observable<boolean>;

  #fb = inject(FormBuilder);
  #dialogRef = inject(MatDialogRef<EditCourseDialogComponent>);
  #data = inject(MAT_DIALOG_DATA);
  #coursesService = inject(CourseEntityService);

  constructor() {
    this.dialogTitle = this.#data.dialogTitle;
    this.course = this.#data.course;
    this.mode = this.#data.mode;

    const formControls = {
      description: ["", Validators.required],
      category: ["", Validators.required],
      longDescription: ["", Validators.required],
      promo: ["", []],
    };

    if (this.mode == "update") {
      this.form = this.#fb.group(formControls);
      this.form.patchValue({ ...this.#data.course });
    } else if (this.mode == "create") {
      this.form = this.#fb.group({
        ...formControls,
        url: ["", Validators.required],
        iconUrl: ["", Validators.required],
      });
    }
  }

  onClose() {
    this.#dialogRef.close();
  }

  onSave() {
    const course: Course = {
      ...this.course,
      ...this.form.value,
    };

    if (this.mode == "update") {
      this.#coursesService.update(course);
      this.#dialogRef.close();
    } else if (this.mode == "create") {
      this.#coursesService.add(course).subscribe((newCourse) => {
        console.log("new course", newCourse);
        this.#dialogRef.close();
      });
    }
  }
}
