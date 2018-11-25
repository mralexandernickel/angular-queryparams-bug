import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-reproduction',
  templateUrl: './reproduction.component.html',
  styleUrls: ['./reproduction.component.css']
})
export class ReproductionComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  public ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((queryParams: Params) => {
      console.log('# QueryParams change has been triggered', queryParams);
    });

    this.setInitialQueryParams();
  }

  /**
   * Setting some initial queryParams we are updating later...
   */
  public setInitialQueryParams(): void {
    const initialParams: Params = {
      one: 'a',
      two: ['b1', 'b2'],
      three: ['c1', 'c2']
    };

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: initialParams
    });
  }

  /**
   * Angular does not detect the change here...
   */
  public updateQueryParamsNotDetectingChange(): void {
    const nextQueryParams: Params = Object.assign(
      {},
      this.activatedRoute.snapshot.queryParams
    );

    nextQueryParams.two.push('b3');

    console.log('# Updated queryParams object is this ==>', nextQueryParams);

    this.router
      .navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: nextQueryParams
      })
      .then(res => {
        console.log('# Response from Router.navigate is this (null) ==>', res);
      });
  }

  /**
   * Add a Math.random to the array...also not triggering a change...
   */
  public updateQueryParamsNotDetectingChangeWorkaroundArray(): void {
    const nextQueryParams: Params = Object.assign(
      {},
      this.activatedRoute.snapshot.queryParams
    );

    nextQueryParams.two.push(Math.random());

    console.log('# Updated queryParams object is this ==>', nextQueryParams);

    this.router
      .navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: nextQueryParams
      })
      .then(res => {
        console.log('# Response from Router.navigate is this (null) ==>', res);
      });
  }

  /**
   * Angular is detecting the change always, because the string value of one
   * key in queryParams has changed...if we would add the Math.random to an
   * array of values, it would be broken again
   *
   * If we first execute `updateQueryParamsNotDetectingChange()` and afterwards
   * `updateQueryParamsNotDetectingChangeWorkaround()`, angular will also detect
   * the changes previously made in `updateQueryParamsNotDetectingChange()`
   */
  public updateQueryParamsNotDetectingChangeWorkaround(): void {
    const nextQueryParams: Params = Object.assign(
      {},
      this.activatedRoute.snapshot.queryParams
    );

    nextQueryParams.three.push('c3');
    nextQueryParams.v = Math.random();

    console.log('# Updated queryParams object is this ==>', nextQueryParams);

    this.router
      .navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: nextQueryParams
      })
      .then(res => {
        console.log('# Response from Router.navigate is this (true) ==>', res);
      });
  }

  /**
   * ...and here we are doing in fact the same as in `updateQueryParamsNotDetectingChange()`
   * but instead of pushing a value to queryParams.two, we are settign a new
   * Array as the value of queryParams.two ==> Angular is detecting the change...
   */
  public updateQueryParamsNotDetectingChangeFunFactOne(): void {
    const nextQueryParams: Params = Object.assign(
      {},
      this.activatedRoute.snapshot.queryParams
    );

    nextQueryParams.two = ['b1', 'b2', 'b3'];

    console.log('# Updated queryParams object is this ==>', nextQueryParams);

    this.router
      .navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: nextQueryParams
      })
      .then(res => {
        console.log('# Response from Router.navigate is this ==>', res);
      });
  }

  /**
   * ...now on could think "aaah....this seems like related to references!",
   * I thought the same and wanted to know what is happening if I completely
   * create a new Array of the previous values in queryParams.two and making
   * sure even Chrome is not able to hold some references (the strings inside the Array)...
   *
   * ...mmmhhh....this is working in this reproduction, but wasn't yesterday in another project.
   * even the string-reference workaroud for chome is not needed to trigger the
   * change... (confused right now)
   */
  public updateQueryParamsNotDetectingChangeFunFactTwo(): void {
    const nextQueryParams: Params = Object.assign(
      {},
      this.activatedRoute.snapshot.queryParams
    );

    const tmp = [];
    for (const item of nextQueryParams.two) {
      // tmp.push((' ' + item).slice(1));
      tmp.push(item);
    }
    tmp.push('b3');

    nextQueryParams.two = tmp;

    console.log('# Updated queryParams object is this ==>', nextQueryParams);

    this.router
      .navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: nextQueryParams
      })
      .then(res => {
        console.log('# Response from Router.navigate is this ==>', res);
      });
  }
}
