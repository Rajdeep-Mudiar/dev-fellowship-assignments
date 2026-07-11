import { useReducer } from "react";

const initialState = { count: 0 };

const reducer = (state, action) => {
  switch (action) {
    case "increment":
      return { count: state.count + 1 };

    case "decrement":
      return { count: state.count - 1 };

    case "reset":
      return initialState;

    default:
      return state;
  }
};

export default function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <section className="counter-card" aria-label="Counter controls">
      <div className="counter-display" aria-live="polite">
        <span className="counter-label">Current count</span>
        <strong>{state.count}</strong>
      </div>

      <div className="counter-actions">
        <button type="button" onClick={() => dispatch("decrement")}>
          -1
        </button>
        <button
          type="button"
          className="primary"
          onClick={() => dispatch("increment")}
        >
          +1
        </button>
        <button type="button" onClick={() => dispatch("reset")}>
          Reset
        </button>
      </div>
    </section>
  );
}
