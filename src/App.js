import { useState } from "react";
import "./App.css";

function Cell({ filled, onClick, isDisabled }) {
  return (
    <button
      disabled={isDisabled}
      type="button"
      onClick={onClick}
      className={`${filled ? "cell cell-activated" : "cell"}`}
    />
  );
}

function App() {
  // Declare States Here :-)
  const [order, setOrder] = useState([]);
  const [isDeactivating, setIsDeactivating] = useState(false);

  //Declare Varivbale her :-)
  const config = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ];

  const deactivateCells = () => {
    setIsDeactivating(true);
    const timer = setInterval(() => {
      setOrder((oriOrder) => {
        const newOrder = oriOrder.slice();
        newOrder.pop();

        if (newOrder.length === 0) {
          clearInterval(timer);
          setIsDeactivating(false);
        }

        return newOrder;
      });
    }, 300);
  };

  const activateCells = (index) => {
    const newOrder = [...order, index];
    setOrder(newOrder);

    if (newOrder.length === config.flat(1).filter(Boolean).length) {
      deactivateCells();
    }
  };

  return (
    <div className="wrapper">
      <div
        className="grid"
        style={{ gridTemplateColumns: `repeat(${config[0].length},1fr)` }}
      >
        {config.flat(1).map((value, index) => {
          return value ? (
            <Cell
              key={index}
              filled={order.includes(index)}
              onClick={() => activateCells(index)}
              isDisabled={order.includes(index) || isDeactivating}
            />
          ) : (
            <span key={index} />
          );
        })}
      </div>
    </div>
  );
}

export default App;
