export type Status = 'SUPERSEDED'
                   | 'SUBMITTED'
                   | 'RETIRED'
                   | 'INVALID'
                   | 'VALID'
                   | 'SUGGESTED'
                   | 'DRAFT';

export const allStatuses = ['DRAFT', 'SUGGESTED', 'SUBMITTED', 'VALID', 'SUPERSEDED', 'RETIRED', 'INVALID'] as Status[];
export const selectableStatuses = ['DRAFT', 'SUBMITTED', 'VALID', 'SUPERSEDED', 'RETIRED', 'INVALID'] as Status[];