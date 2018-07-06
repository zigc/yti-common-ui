export type Status = 'UNFINISHED'
                   | 'SUPERSEDED'
                   | 'SUBMITTED'
                   | 'RETIRED'
                   | 'INVALID'
                   | 'VALID'
                   | 'SUGGESTED'
                   | 'DRAFT';

export const allStatuses = ['UNFINISHED', 'DRAFT', 'SUGGESTED', 'SUBMITTED', 'VALID', 'SUPERSEDED', 'RETIRED', 'INVALID'] as Status[];
export const selectableStatuses = ['UNFINISHED', 'DRAFT', 'SUBMITTED', 'VALID', 'SUPERSEDED', 'RETIRED', 'INVALID'] as Status[];
export const restrictedStatuses = ['VALID', 'SUPERSEDED', 'RETIRED', 'INVALID'] as Status[];
