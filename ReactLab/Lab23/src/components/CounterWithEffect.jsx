import PropTypes from "prop-types";
import { useState } from "react";
import UseEffectExample from "./UseEffectExample";

const Peremennaya = ({ setCount }) => (
    <button
        onClick={() => {
            setCount((prevCount) => prevCount + 1);
            setCount((prevCount) => prevCount + 1);
        }}
    >
        Увеличить счетчик
    </button>
);

// Добавляем валидацию пропсов для компонента Peremennaya
Peremennaya.propTypes = {
    setCount: PropTypes.func.isRequired,
    count: PropTypes.number.isRequired,
};

function CounterWithEffect() {
    const [count, setCount] = useState(0);
    const [showEffect, setShowEffect] = useState(true);

    return (
        <div>
            <h2>useState Пример</h2>
            <p>Текущее значение счетчика: {count}</p>
            <button onClick={() => setCount(count + 1)}>
                Увеличить счетчик
            </button>
            <Peremennaya setCount={setCount} count={count} />
            <button onClick={() => setShowEffect(!showEffect)}>
                {showEffect
                    ? "Скрыть UseEffectExample"
                    : "Показать UseEffectExample"}
            </button>

            {showEffect && <UseEffectExample />}
        </div>
    );
}

export default CounterWithEffect;
