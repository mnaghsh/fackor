import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {UsersService} from "../../services/users/users.service";
import {MissionService} from "../../services/mission/mission.service";

@Injectable({
  providedIn: 'root'
})
export class MissionGuard implements CanActivate {

  constructor(private usersService: UsersService,
              private myRoute: Router,
              private missionService: MissionService) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.usersService.userHasMission()) {
      this.missionService.hasAvticeMission.status = false;
      this.missionService.hasAvticeMission.message =
        "شما ماموریت فعالی ندارید"
      this.myRoute.navigate(['login']);
      return false;
    }
    this.missionService.hasAvticeMission.status = true;
    return true;
  }
}
