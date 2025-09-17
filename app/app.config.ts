export default defineAppConfig({
  ui: {
    colors: {
      primary: 'main'
    },
    button: {
      slots: { base: 'cursor-pointer' }
    },
    checkbox: {
      slots: { base: 'cursor-pointer' }
    },
    select: {
      slots: {
        base: 'cursor-pointer',
        item: 'cursor-pointer'
      }
    },
    calendar: {
      slots: {
        cell: 'cursor-pointer'
      }
    }
  }
});