import { create } from 'zustand'

const useLabStore = create((set, get) => ({
  samples: [],
  testResults: [],
  pendingTests: [],

  // Sample Management
  addSample: (sample) => {
    set((state) => ({
      samples: [...state.samples, { 
        ...sample, 
        id: Date.now().toString(),
        collectedAt: new Date().toISOString(),
        status: 'collected'
      }]
    }))
  },

  updateSample: (sampleId, updates) => {
    set((state) => ({
      samples: state.samples.map(sample => 
        sample.id === sampleId ? { ...sample, ...updates } : sample
      )
    }))
  },

  // Test Results
  addTestResult: (result) => {
    set((state) => ({
      testResults: [...state.testResults, { 
        ...result, 
        id: Date.now().toString(),
        testedAt: new Date().toISOString()
      }]
    }))
    
    // Update sample status
    set((state) => ({
      samples: state.samples.map(sample => 
        sample.id === result.sampleId 
          ? { ...sample, status: 'tested', testResultId: result.id }
          : sample
      )
    }))
  },

  updateTestResult: (resultId, updates) => {
    set((state) => ({
      testResults: state.testResults.map(result => 
        result.id === resultId ? { ...result, ...updates } : result
      )
    }))
  },

  // Get samples by status
  getSamplesByStatus: (status) => {
    return get().samples.filter(sample => sample.status === status)
  },

  // Get MRL violations
  getMRLViolations: () => {
    return get().testResults.filter(result => result.exceedsMRL === true)
  },

  // Get pending tests
  getPendingTests: () => {
    return get().samples.filter(sample => sample.status === 'collected')
  },
}))

export { useLabStore }
