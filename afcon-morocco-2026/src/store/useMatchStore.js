import { create } from 'zustand';
import axios from 'axios';

const useMatchStore = create((set) => ({
  
  matches: [],
  loading: false,
  error: null,

  
  fetchMatches: async () => {
    set({ loading: true });
    try {
      
      const response = await axios.get('/data/matches.json'); 
      set({ matches: response.data, loading: false });
    } catch (err) {
      set({ error: "  sorry , we cant load the data ", loading: false });
    }
  },

  
  getMatchById: (id) => (state) => state.matches.find(m => m.id === parseInt(id))
}));

export default useMatchStore;