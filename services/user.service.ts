import {Inject, Injectable, InjectionToken} from '@angular/core';
import {Http} from '@angular/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {combineResultSets, convertToMapSet, hasAny } from '../utils/set';
import {Observable} from 'rxjs/Observable';

export const AUTHENTICATED_USER_ENDPOINT = new InjectionToken<string>('authenticated.user.endpoint');

export type Role = 'ADMIN'
                 | 'DATA_MODEL_EDITOR'
                 | 'TERMINOLOGY_EDITOR'
                 | 'CODE_LIST_EDITOR';

export type UUID = string;

declare const window: Window;

export class User {

  email: string;
  firstName: string;
  lastName: string;
  anonymous: boolean;
  superuser: boolean;
  rolesInOrganizations: Map<UUID, Set<Role>>;
  organizationsInRole: Map<Role, Set<UUID>>;

  constructor(json: any) {
    this.email = json.email;
    this.firstName = json.firstName;
    this.lastName = json.lastName;
    this.anonymous = json.anonymous;
    this.superuser = json.superuser;
    this.rolesInOrganizations = convertToMapSet<UUID, Role>(json.rolesInOrganizations);
    this.organizationsInRole = convertToMapSet<Role, UUID>(json.organizationsInRole);
  }

  get name() {
    return this.firstName + ' ' + this.lastName;
  }

  getRoles(organizationIds: UUID|UUID[]): Set<Role> {
    return combineResultSets<UUID, Role>(this.rolesInOrganizations, organizationIds);
  }

  getOrganizations(roles: Role|Role[]): Set<UUID> {
    return combineResultSets<Role, UUID>(this.organizationsInRole, roles);
  }

  isInRole(role: Role|Role[], organizationIds: UUID|UUID[]) {
    return hasAny(this.getRoles(organizationIds), role);
  }

  isInOrganization(organizationIds: UUID|UUID[], roles: Role|Role[]) {
    return hasAny(this.getOrganizations(roles), organizationIds);
  }
}

const anonymousUser = new User({
  email: '',
  firstName: '',
  lastName: '',
  anonymous: true,
  superuser: false,
  rolesInOrganizations: {},
  organizationsInRole: {}
});

@Injectable()
export class UserService {

  user: User = anonymousUser;
  private _loggedIn$ = new BehaviorSubject(false);

  constructor(http: Http,
              @Inject(AUTHENTICATED_USER_ENDPOINT) authenticatedUserEndpoint: string) {

    http.get(authenticatedUserEndpoint)
      .subscribe(response => {
        this.user = new User(response.json());
        this.updateLoggedIn();
      });
  }

  get loggedIn$(): Observable<boolean> {
    return this._loggedIn$.asObservable();
  }

  isLoggedIn() {
    return !this.user.anonymous;
  }

  register() {
    window.open('http://id.eduuni.fi/signup', '_blank');
  }

  login() {
    const currentUrl = window.location.href;
    window.location.href = `/Shibboleth.sso/Login?target=${encodeURIComponent(currentUrl)}`;
  }

  logout() {
    const currentUrl = window.location.href;
    window.location.href = `/Shibboleth.sso/Logout?return=${encodeURIComponent(currentUrl)}`;
  }

  private updateLoggedIn() {
    this._loggedIn$.next(this.isLoggedIn());
  }
}
