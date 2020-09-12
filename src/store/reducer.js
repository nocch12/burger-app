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
      return {
        ...state,
        persons: state.persons.concat(newPerson),
      }
    case "SUB":
      return {
        ...state,
        persons: state.persons.filter(person => person.id !== payload),
      }
    default:
      return state;
  }
};
