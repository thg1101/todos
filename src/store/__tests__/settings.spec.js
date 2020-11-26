import settings from '../settings'

describe('Settings module', () => {
  describe('getters', () => {
    it('should get darkMode', () => {
      expect(settings.getters.darkMode({ darkMode: false })).toBe(false)
    })
  })

  describe('mutations', () => {
    it('should test setDarkMode', () => {
      // mock state
      const state = { darkMode: false }
      // apply mutation
      settings.mutations.setDarkMode(state, true)
      // assert result
      expect(state.darkMode).toBe(true)
      // look into the side effects
      expect(document.body.classList.contains('dark')).toBe(true)

      settings.mutations.setDarkMode(state, false)

      expect(state.darkMode).toBe(false)
      expect(document.body.classList.contains('dark')).toBe(false)
    })
  })
})
