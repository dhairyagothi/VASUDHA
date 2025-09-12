import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (credentials) => {
        set({ isLoading: true })
        try {
          // Simulate API call
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
          })
          
          const data = await response.json()
          
          if (response.ok) {
            set({
              user: data.user,
              token: data.token,
              isAuthenticated: true,
              isLoading: false,
            })
            return { success: true }
          } else {
            set({ isLoading: false })
            return { success: false, error: data.message }
          }
        } catch (error) {
          set({ isLoading: false })
          return { success: false, error: 'Network error' }
        }
      },

      register: async (userData) => {
        set({ isLoading: true })
        try {
          // Simulate API call
          const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
          })
          
          const data = await response.json()
          
          if (response.ok) {
            set({
              user: data.user,
              token: data.token,
              isAuthenticated: true,
              isLoading: false,
            })
            return { success: true }
          } else {
            set({ isLoading: false })
            return { success: false, error: data.message }
          }
        } catch (error) {
          set({ isLoading: false })
          return { success: false, error: 'Network error' }
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        })
      },

      updateProfile: (updates) => {
        set((state) => ({
          user: { ...state.user, ...updates }
        }))
      },

      // Mock login for demo purposes
      mockLogin: (role) => {
        const mockUsers = {
          farmer: {
            id: '1',
            name: 'Rajesh Kumar',
            email: 'rajesh@farm.com',
            role: 'farmer',
            farmId: 'farm_001',
            phone: '+91-9876543210',
            location: 'Maharashtra, India'
          },
          veterinarian: {
            id: '2',
            name: 'Dr. Priya Sharma',
            email: 'priya@vet.com',
            role: 'veterinarian',
            license: 'VET12345',
            phone: '+91-9876543211',
            specialization: 'Cattle'
          },
          lab: {
            id: '3',
            name: 'Central Lab Mumbai',
            email: 'lab@central.com',
            role: 'lab',
            labId: 'LAB_001',
            accreditation: 'NABL-2023',
            phone: '+91-9876543212'
          },
          regulator: {
            id: '4',
            name: 'Amit Singh',
            email: 'amit@ministry.gov.in',
            role: 'regulator',
            department: 'Ministry of Fisheries',
            region: 'Western India',
            phone: '+91-9876543213'
          },
          admin: {
            id: '5',
            name: 'System Admin',
            email: 'admin@vasudha.com',
            role: 'admin',
            permissions: ['all'],
            phone: '+91-9876543214'
          }
        }

        const user = mockUsers[role]
        if (user) {
          set({
            user,
            token: `mock_token_${role}`,
            isAuthenticated: true,
          })
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)

export { useAuthStore }
