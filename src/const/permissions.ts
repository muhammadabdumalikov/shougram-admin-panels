export const PERMISSIONS = {
  holder: {
    read: 'READ_HOLDER',
    invite: 'INVITE_HOLDER',
    update: 'UPDATE_HOLDER',
    delete: 'DELETE_HOLDER',
  },
  jobTitle: {
    read: 'READ_JOB_TITLE',
    create: 'CREATE_JOB_TITLE',
    update: 'UPDATE_JOB_TITLE',
    delete: 'DELETE_JOB_TITLE',
  },
  workType: {
    read: 'READ_WORK_TYPE',
    create: 'CREATE_WORK_TYPE',
    update: 'UPDATE_WORK_TYPE',
    delete: 'DELETE_WORK_TYPE',
  },
  company: {
    read: 'READ_COMPANY',
    create: 'CREATE_COMPANY',
    update: 'UPDATE_COMPANY',
    delete: 'DELETE_COMPANY',
  },
  manager: {
    read: 'READ_MANAGER',
    create: 'CREATE_MANAGER',
    update: 'UPDATE_MANAGER',
    delete: 'DELETE_MANAGER',
  },
  QRCode: {
    read: 'READ_QR_CODE',
    history: 'READ_QR_CODE_HISTORY',
    update: 'UPDATE_QR_CODE',
    delete: 'DELETE_QR_CODE',
  },
  request: {
    read: 'READ_REQUEST',
    update: 'UPDATE_REQUEST',
    delete: 'DELETE_REQUEST',
  },
  statistic: {
    jobTitles: 'READ_JOB_STATISTICS',
    workTypes: 'READ_WORK_TYPE_STATISTICS',
    ads: 'READ_ADS_STATISTICS',
    vacancies: 'READ_VACANCY_STATISTICS',
  },
  vacancies: {
    read: 'READ_VACANCY',
    create: 'CREATE_VACANCY',
    update: 'UPDATE_VACANCY',
    delete: 'DELETE_VACANCY',
    publish: 'PUBLISH_VACANCY',
    archive: 'ARCHIVE_VACANCY',
  },
  ads: {
    read: 'READ_ADS',
    create: 'CREATE_ADS',
    update: 'UPDATE_ADS',
    delete: 'DELETE_ADS',
  },
};
