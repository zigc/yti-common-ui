import { contains } from "../utils/array";

export type Status = 'INCOMPLETE'
  | 'SUPERSEDED'
  | 'RETIRED'
  | 'INVALID'
  | 'VALID'
  | 'SUGGESTED'
  | 'DRAFT';

export const allStatuses = ['INCOMPLETE', 'DRAFT', 'SUGGESTED', 'VALID', 'SUPERSEDED', 'RETIRED', 'INVALID'] as Status[];
export const selectableStatuses = ['INCOMPLETE', 'DRAFT', 'VALID', 'SUPERSEDED', 'RETIRED', 'INVALID'] as Status[];
export const restrictedStatuses = ['VALID', 'SUPERSEDED', 'RETIRED', 'INVALID'] as Status[];
export const regularStatuses = ['DRAFT', 'SUGGESTED', 'VALID', 'SUPERSEDED', 'RETIRED', 'INVALID'] as Status[];
export const creationTimeAllowedStatuses = ['DRAFT', 'INCOMPLETE'] as Status[];

export function allowedTargetStatuses(fromStatus: Status, includeFrom: boolean = true): Status[] {

  const allowedTargetStatusesFrom_INCOMPLETE = ['DRAFT'] as Status[];
  const allowedTargetStatusesFrom_DRAFT = ['INCOMPLETE', 'VALID'] as Status[];
  const allowedTargetStatusesFrom_VALID = ['SUPERSEDED', 'RETIRED', 'INVALID'] as Status[];
  const allowedTargetStatusesFrom_SUPERSEDED = ['VALID', 'RETIRED', 'INVALID'] as Status[];
  const allowedTargetStatusesFrom_RETIRED = ['VALID', 'SUPERSEDED', 'INVALID'] as Status[];
  const allowedTargetStatusesFrom_INVALID = ['VALID', 'SUPERSEDED', 'RETIRED'] as Status[];

  const includeFromStatusIfNeeded = (statuses: Status[]) => {
    if (includeFrom) {
      statuses.unshift(fromStatus);
    }
    return statuses;
  };

  if (fromStatus === 'INCOMPLETE') {
    return includeFromStatusIfNeeded(allowedTargetStatusesFrom_INCOMPLETE);
  } else if (fromStatus === 'DRAFT') {
    return includeFromStatusIfNeeded(allowedTargetStatusesFrom_DRAFT);
  } else if (fromStatus === 'VALID') {
    return includeFromStatusIfNeeded(allowedTargetStatusesFrom_VALID);
  } else if (fromStatus === 'SUPERSEDED') {
    return includeFromStatusIfNeeded(allowedTargetStatusesFrom_SUPERSEDED);
  } else if (fromStatus === 'RETIRED') {
    return includeFromStatusIfNeeded(allowedTargetStatusesFrom_RETIRED);
  } else if (fromStatus === 'INVALID') {
    return includeFromStatusIfNeeded(allowedTargetStatusesFrom_INVALID);
  } else {
    return selectableStatuses; // should never come here
  }
}

export function changeToRestrictedStatus(fromStatus: Status, toStatus: Status): boolean {
  return !contains(restrictedStatuses, fromStatus) && contains(restrictedStatuses, toStatus);
}
