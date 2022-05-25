import * as React from "react";
import { createRoot } from "react-dom/client";
import { useMounted, usePrevious } from "hooks";
function App() {
  const [count, setCount] = React.useState(0);
  useMounted(() => {
    console.log("Mounted!");
  });

  const prevCount = usePrevious(count);
  console.log("prevCount", prevCount, "count", count);
  const increment = () => {
    setCount((prevCount: number) => prevCount + 1);
  };
  return (
    <div>
      <div>Count is:{count}</div>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

const root = createRoot(document.querySelector("#root")!);
root.render(<App />);
