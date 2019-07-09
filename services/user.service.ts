import { Inject, Injectable, InjectionToken } from '@angular/core';
import { combineResultSets, convertToMapSet, hasAny } from '../utils/set';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

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

  isInRoleInAnyOrganization(roles: Role | Role[]) {
    return this.getOrganizations(roles).size > 0;
  }

  getRoles(organizationIds: UUID | UUID[]): Set<Role> {
    return combineResultSets<UUID, Role>(this.rolesInOrganizations, organizationIds);
  }

  getOrganizations(roles: Role | Role[]): Set<UUID> {
    return combineResultSets<Role, UUID>(this.organizationsInRole, roles);
  }

  isInRole(role: Role | Role[], organizationIds: UUID | UUID[]) {
    return hasAny(this.getRoles(organizationIds), role);
  }

  isInOrganization(organizationIds: UUID | UUID[], roles: Role | Role[]) {
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

  constructor(private http: HttpClient,
              @Inject(AUTHENTICATED_USER_ENDPOINT) private authenticatedUserEndpoint: string) {

    this.updateLoggedInUser().catch(reason => console.error('Resolving user failed: ' + reason));

    setInterval(() => {
      if (!this.user.anonymous) {
        this.updateLoggedInUser().catch(reason => console.error('Resolving user failed: ' + reason));;
      }
    }, oneMinuteInMs);
  }

  private _user$ = new BehaviorSubject<User>(anonymousUser);

  get user$(): Observable<User> {
    return this._user$.asObservable();
  }

  get user(): User {
    return this._user$.getValue();
  }

  get loggedIn$(): Observable<boolean> {
    return this._user$.pipe(map(u => !u.anonymous));
  }

  updateLoggedInUser(fakeLoginMail?: string): Promise<User> {
    return new Promise((resolve, reject) => {
      let params = new HttpParams();
      if (fakeLoginMail) {
        params = params.append('fake.login.mail', fakeLoginMail);
      }
      this.http.get<any>(this.authenticatedUserEndpoint, { params })
        .subscribe((body: any) => {
          const newUser = new User(body);
          if (!compareUsers(this.user, newUser)) {
            this._user$.next(newUser);
          }
          resolve(this.user);
        }, err => {
          reject(err instanceof HttpErrorResponse ? err.message ? err.message : err.error ? err.error : err.statusText : err);
        });
    });
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

function compareUsers(user1: User, user2: User): boolean {
  return user1.email === user2.email &&
    user1.firstName === user2.firstName &&
    user1.lastName === user2.lastName &&
    user1.anonymous === user2.anonymous &&
    user1.superuser === user2.superuser &&
    compareRoles(user1.rolesInOrganizations, user2.rolesInOrganizations);
}

function compareRoles(rolesInOrganizations1: Map<UUID, Set<Role>>, rolesInOrganizations2: Map<UUID, Set<Role>>): boolean {
  if (rolesInOrganizations1.size !== rolesInOrganizations2.size) {
    return false;
  }

  // TODO: This should work:
  //       for (let [id, roles1] of rolesInOrganizations1) {

  const iter = rolesInOrganizations1.entries();
  let next = iter.next();
  while (!next.done) {
    const [id, roles1] = next.value;
    let roles2 = rolesInOrganizations2.get(id);
    if (!roles2 || roles1.size !== roles2.size) {
      return false;
    }
    const roleIter = roles1.keys();
    let nextRole = roleIter.next();
    while (!nextRole.done) {
      let role = nextRole.value;
      if (!roles2.has(role)) {
        return false;
      }
      nextRole = roleIter.next();
    }
    next = iter.next();
  }
  return true;
}
