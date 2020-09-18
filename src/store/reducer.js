const initialState = {
  persons: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "ADD":
      const newPerson = {
        id: Math.random(),
        name: payload.name,
        age: payload.age,
      };
      state = {
        ...state,
        persons: state.persons.concat(newPerson),
      }
    case "SUB":
      state = {
        ...state,
        persons: state.persons.filter(person => person.id !== payload),
      }
    default:
      return state;
  }
};
