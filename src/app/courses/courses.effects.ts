import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CourseActions } from "./action-types";
import { concatMap, map } from "rxjs/operators";
import { CoursesHttpService } from "./services/courses-http.service";

@Injectable()
export class CoursesEffects {
  #actions$ = inject(Actions);
  #coursesHttpService = inject(CoursesHttpService);

  loadCourses$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(CourseActions.loadAllCourses),
      concatMap((action) => this.#coursesHttpService.findAllCourses()),
      map((courses) => CourseActions.allCoursesLoaded({ courses }))
    )
  );

  saveCourses$ = createEffect(
    () =>
      this.#actions$.pipe(
        ofType(CourseActions.courseUpdated),
        concatMap((action) =>
          this.#coursesHttpService.saveCourse(
            action.update.id,
            action.update.changes
          )
        )
      ),
    { dispatch: false }
  );
}
