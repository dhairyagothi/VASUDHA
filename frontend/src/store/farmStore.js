import { create } from 'zustand'

const useFarmStore = create((set, get) => ({
  farms: [],
  animals: [],
  selectedFarm: null,
  selectedAnimal: null,

  // Farm Management
  addFarm: (farm) => {
    set((state) => ({
      farms: [...state.farms, { ...farm, id: Date.now().toString() }]
    }))
  },

  updateFarm: (farmId, updates) => {
    set((state) => ({
      farms: state.farms.map(farm => 
        farm.id === farmId ? { ...farm, ...updates } : farm
      )
    }))
  },

  deleteFarm: (farmId) => {
    set((state) => ({
      farms: state.farms.filter(farm => farm.id !== farmId)
    }))
  },

  setSelectedFarm: (farm) => {
    set({ selectedFarm: farm })
  },

  // Animal Management
  addAnimal: (animal) => {
    set((state) => ({
      animals: [...state.animals, { ...animal, id: Date.now().toString() }]
    }))
  },

  updateAnimal: (animalId, updates) => {
    set((state) => ({
      animals: state.animals.map(animal => 
        animal.id === animalId ? { ...animal, ...updates } : animal
      )
    }))
  },

  deleteAnimal: (animalId) => {
    set((state) => ({
      animals: state.animals.filter(animal => animal.id !== animalId)
    }))
  },

  setSelectedAnimal: (animal) => {
    set({ selectedAnimal: animal })
  },

  // Get animals by farm
  getAnimalsByFarm: (farmId) => {
    return get().animals.filter(animal => animal.farmId === farmId)
  },
}))

export { useFarmStore }
