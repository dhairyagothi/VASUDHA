import { create } from 'zustand'

const useInventoryStore = create((set, get) => ({
  drugs: [],
  inventory: [],
  administrations: [],
  prescriptions: [],

  // Drug Management
  addDrug: (drug) => {
    set((state) => ({
      drugs: [...state.drugs, { ...drug, id: Date.now().toString() }]
    }))
  },

  updateDrug: (drugId, updates) => {
    set((state) => ({
      drugs: state.drugs.map(drug => 
        drug.id === drugId ? { ...drug, ...updates } : drug
      )
    }))
  },

  // Inventory Management
  addInventoryItem: (item) => {
    set((state) => ({
      inventory: [...state.inventory, { ...item, id: Date.now().toString() }]
    }))
  },

  updateInventory: (itemId, updates) => {
    set((state) => ({
      inventory: state.inventory.map(item => 
        item.id === itemId ? { ...item, ...updates } : item
      )
    }))
  },

  // Drug Administration
  addAdministration: (administration) => {
    set((state) => ({
      administrations: [...state.administrations, { 
        ...administration, 
        id: Date.now().toString(),
        timestamp: new Date().toISOString()
      }]
    }))
  },

  // Prescriptions
  addPrescription: (prescription) => {
    set((state) => ({
      prescriptions: [...state.prescriptions, { 
        ...prescription, 
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      }]
    }))
  },

  updatePrescription: (prescriptionId, updates) => {
    set((state) => ({
      prescriptions: state.prescriptions.map(prescription => 
        prescription.id === prescriptionId ? { ...prescription, ...updates } : prescription
      )
    }))
  },

  // Get low stock items
  getLowStockItems: () => {
    return get().inventory.filter(item => item.quantity <= item.minStock)
  },

  // Get expired items
  getExpiredItems: () => {
    const today = new Date()
    return get().inventory.filter(item => new Date(item.expiryDate) <= today)
  },
}))

export { useInventoryStore }
