export type Status = 'INCOMPLETE'
                   | 'SUPERSEDED'
                   | 'SUBMITTED'
                   | 'RETIRED'
                   | 'INVALID'
                   | 'VALID'
                   | 'SUGGESTED'
                   | 'DRAFT';

export const allStatuses = ['INCOMPLETE', 'DRAFT', 'SUGGESTED', 'SUBMITTED', 'VALID', 'SUPERSEDED', 'RETIRED', 'INVALID'] as Status[];
export const selectableStatuses = ['INCOMPLETE', 'DRAFT', 'SUBMITTED', 'VALID', 'SUPERSEDED', 'RETIRED', 'INVALID'] as Status[];
export const restrictedStatuses = ['VALID', 'SUPERSEDED', 'RETIRED', 'INVALID'] as Status[];
