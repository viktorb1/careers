import { createPinia, setActivePinia } from 'pinia'
import axios from 'axios'
import type { Mock } from 'vitest'

import { useJobsStore } from '@/stores/jobs'
import { useUserStore } from '@/stores/user'
import type { Job } from '@/api/types'

describe('state', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('stores job listings', () => {
    const store = useJobsStore()
    expect(store.jobs).toEqual([])
  })
})

vi.mock('axios')
const axiosGetMock = axios.get as Mock

describe('actions', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('FETCH_JOBS', () => {
    it('makes API request and stores received jobs', async () => {
      axiosGetMock.mockResolvedValue({ data: ['Job 1', 'Job 2'] })
      const store = useJobsStore()
      await store.FETCH_JOBS()
      expect(store.jobs).toEqual(['Job 1', 'Job 2'])
    })
  })
})

describe('getters', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('UNIQUE_ORGANIZATIONS', () => {
    it('finds unique organizations from list of jobs', () => {
      const store = useJobsStore()
      store.jobs = [
        { organization: 'Google' },
        { organization: 'Amazon' },
        { organization: 'Google' }
      ] as Job[]

      const result = store.UNIQUE_ORGANIZATIONS
      expect(result).toEqual(new Set(['Google', 'Amazon']))
    })
  })

  describe('UNIQUE_JOB_TYPES', () => {
    it('finds unique job types from list of jobs', () => {
      const store = useJobsStore()
      store.jobs = [
        { jobType: 'Full-time' },
        { jobType: 'Temporary' },
        { jobType: 'Full-time' }
      ] as Job[]

      const result = store.UNIQUE_JOB_TYPES
      expect(result).toEqual(new Set(['Full-time', 'Temporary']))
    })
  })

  describe('INCLUDE_JOB_BY_ORGANIZATIONS', () => {
    describe('when the user has not selected any organizations', () => {
      it('includes jobs', () => {
        const userStore = useUserStore()
        userStore.selectedOrganizations = []
        const store = useJobsStore()
        const job = { organization: 'Google' } as Job

        const result = store.INCLUDE_JOB_BY_ORGANIZATION(job)
        expect(result).toBe(true)
      })
    })

    it('identifies if job is associated with given organizations', () => {
      const userStore = useUserStore()
      userStore.selectedOrganizations = ['Google', 'Microsoft']
      const store = useJobsStore()
      const job = { organization: 'Google' }

      const result = store.INCLUDE_JOB_BY_ORGANIZATION(job)
      expect(result).toBe(true)
    })
  })

  describe('INCLUDE_JOB_BY_JOB_TYPE', () => {
    describe('when the user has not selected any job types', () => {
      it('includes jobs', () => {
        const userStore = useUserStore()
        userStore.selectedJobTypes = []
        const store = useJobsStore()
        const job = { jobType: 'Full-time' } as Job

        const result = store.INCLUDE_JOB_BY_JOB_TYPE(job)
        expect(result).toBe(true)
      })
    })

    it('identifies if job is associated with given organizations', () => {
      const userStore = useUserStore()
      userStore.selectedJobTypes = ['Full-time', 'Part-time']
      const store = useJobsStore()
      const job = { jobType: 'Part-time' } as Job

      const result = store.INCLUDE_JOB_BY_JOB_TYPE(job)
      expect(result).toBe(true)
    })
  })

  describe('INCLUDE_JOB_BY_DEGREE', () => {
    describe('when the user has not selected any job types', () => {
      it('includes jobs', () => {
        const userStore = useUserStore()
        userStore.selectedDegrees = []
        const store = useJobsStore()
        const job = { jobType: 'Full-time' } as Job

        const result = store.INCLUDE_JOB_BY_DEGREE(job)
        expect(result).toBe(true)
      })
    })

    it('identifies if job is associated with given degrees', () => {
      const userStore = useUserStore()
      userStore.selectedDegrees = ["Master's"]
      const store = useJobsStore()
      const job = { degree: "Master's" } as Job

      const result = store.INCLUDE_JOB_BY_DEGREE(job)
      expect(result).toBe(true)
    })
  })

  // describe('FILTERED_JOBS_BY_ORGANIZATIONS', () => {
  //   it('identifies jobs that are associated with the given organizations', () => {
  //     const jobsStore = useJobsStore()
  //     jobsStore.jobs = [
  //       { organization: 'Google' },
  //       { organization: 'Amazon' },
  //       { organization: 'Microsoft' }
  //     ]

  //     const userStore = useUserStore()
  //     userStore.selectedOrganizations = ['Google', 'Microsoft']
  //     const result = jobsStore.FILTERED_JOBS_BY_ORGANIZATIONS
  //     expect(result).toEqual([{ organization: 'Google' }, { organization: 'Microsoft' }])
  //   })
  // })

  // describe('FILTERED_JOBS_BY_JOB_TYPES', () => {
  //   it('identifies jobs that are associated with given job types', () => {
  //     const jobsStore = useJobsStore()
  //     jobsStore.jobs = [
  //       { jobType: 'Full-time' },
  //       { jobType: 'Temporary' },
  //       { jobType: 'Part-time' }
  //     ]
  //     const userStore = useUserStore()
  //     userStore.selectedJobTypes = ['Full-time', 'Part-time']
  //     const result = jobsStore.FILTERED_JOBS_BY_JOB_TYPES
  //     expect(result).toEqual([{ jobType: 'Full-time' }, { jobType: 'Part-time' }])
  //   })

  //   describe('when the user has not selected any job types', () => {
  //     it('returns all jobs', () => {
  //       const jobsStore = useJobsStore()
  //       jobsStore.jobs = [
  //         { jobType: 'Full-time' },
  //         { jobType: 'Temporary' },
  //         { jobType: 'Part-time' }
  //       ]
  //       const userStore = useUserStore()
  //       userStore.selectedJobTypes = []
  //       const result = jobsStore.FILTERED_JOBS_BY_JOB_TYPES
  //       expect(result).toEqual(jobsStore.jobs)
  //     })
  //   })
  // })

  // describe('when the user has not selected any organizations', () => {
  //   it('returns all jobs', () => {
  //     const jobsStore = useJobsStore()
  //     jobsStore.jobs = [
  //       { organization: 'Google' },
  //       { organization: 'Amazon' },
  //       { organization: 'Microsoft' }
  //     ]

  //     const userStore = useUserStore()
  //     userStore.selectedOrganizations = []
  //     const result = jobsStore.FILTERED_JOBS_BY_ORGANIZATIONS
  //     expect(result).toEqual(jobsStore.jobs)
  //   })
  // })
})
