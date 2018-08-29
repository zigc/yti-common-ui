import {Inject, Injectable, InjectionToken} from '@angular/core';
import {combineResultSets, convertToMapSet, hasAny } from '../utils/set';
import {Observable, BehaviorSubject} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';

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

  isAdminInAnyOrganization() {
    return this.isInRoleInAnyOrganization('ADMIN');
  }

  isInRoleInAnyOrganization(roles: Role|Role[]) {
    return this.getOrganizations(roles).size > 0;
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

const oneMinuteInMs = 60 * 1000;

@Injectable()
export class UserService {

  user: User = anonymousUser;
  private _loggedIn$ = new BehaviorSubject(false);

  constructor(private http: HttpClient,
              @Inject(AUTHENTICATED_USER_ENDPOINT) private authenticatedUserEndpoint: string) {

    this.updateLoggedInUser();

    setInterval(() => {
      if (!this.user.anonymous) {
        this.updateLoggedInUser();
      }
    }, oneMinuteInMs);
  }

  updateLoggedInUser(fakeLoginMail?: string) {

    let params = new HttpParams();

    if (fakeLoginMail) {
      params = params.append('fake.login.mail', fakeLoginMail);
    }

    this.http.get<any>(this.authenticatedUserEndpoint, { params })
      .subscribe((body: any) => {
        this.user = new User(body);
        this._loggedIn$.next(!this.user.anonymous);
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
}
