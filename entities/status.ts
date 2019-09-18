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
export const creationTimeAllowedStatuses = ['DRAFT', 'SUGGESTED'] as Status[];
