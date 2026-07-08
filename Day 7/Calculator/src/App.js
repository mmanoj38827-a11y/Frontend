import React, { useState } from 'react';

/* ============ CSS ============ */
const styles = `
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

:root {
  --bg: #0f172a;
  --calc-bg: #1e293b;
  --display-bg: #0f172a;
  --btn-bg: #334155;
  --btn-hover: #475569;
  --btn-active: #64748b;
  --operator: #f59e0b;
  --operator-hover: #d97706;
  --equals: #10b981;
  --equals-hover: #059669;
  --clear: #ef4444;
  --clear-hover: #dc2626;
  --text: #f8fafc;
  --text-dim: #94a3b8;
  --shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
  --radius: 16px;
  --transition: all 0.15s ease;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
  background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text);
}

.calculator-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.calculator-title {
  text-align: center;
}

.calculator-title h1 {
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(90deg, #f59e0b, #ec4899, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
}

.calculator-title p {
  color: var(--text-dim);
  font-size: 1rem;
}

.calculator {
  background: var(--calc-bg);
  border-radius: var(--radius);
  padding: 1.5rem;
  width: 360px;
  box-shadow: var(--shadow);
  border: 1px solid rgba(255,255,255,0.05);
}

/* Display */
.display {
  background: var(--display-bg);
  border-radius: 12px;
  padding: 1.25rem;
  margin-bottom: 1.25rem;
  text-align: right;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border: 1px solid rgba(255,255,255,0.05);
}

.previous {
  color: var(--text-dim);
  font-size: 1rem;
  min-height: 24px;
  word-break: break-all;
}

.current {
  color: var(--text);
  font-size: 2.5rem;
  font-weight: 600;
  word-break: break-all;
  margin-top: 0.25rem;
}

/* Buttons Grid */
.buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
}

.btn {
  height: 64px;
  border: none;
  border-radius: 12px;
  font-size: 1.25rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  color: var(--text);
  background: var(--btn-bg);
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn:hover {
  background: var(--btn-hover);
  transform: translateY(-2px);
}

.btn:active {
  background: var(--btn-active);
  transform: translateY(0);
}

.btn.span-2 {
  grid-column: span 2;
}

.btn.operator {
  background: var(--operator);
  color: white;
  font-size: 1.5rem;
}

.btn.operator:hover {
  background: var(--operator-hover);
}

.btn.equals {
  background: var(--equals);
  color: white;
  font-size: 1.5rem;
}

.btn.equals:hover {
  background: var(--equals-hover);
}

.btn.clear {
  background: var(--clear);
  color: white;
}

.btn.clear:hover {
  background: var(--clear-hover);
}

.btn.zero {
  grid-column: span 2;
}

/* History */
.history-panel {
  background: var(--calc-bg);
  border-radius: var(--radius);
  padding: 1.25rem;
  width: 360px;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: var(--shadow);
  border: 1px solid rgba(255,255,255,0.05);
}

.history-panel h3 {
  font-size: 1rem;
  color: var(--text-dim);
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.history-item {
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  font-size: 0.9rem;
  color: var(--text-dim);
  display: flex;
  justify-content: space-between;
}

.history-item:last-child {
  border-bottom: none;
}

.history-item .result {
  color: var(--text);
  font-weight: 600;
}

.clear-history {
  margin-top: 0.75rem;
  width: 100%;
  padding: 0.5rem;
  border: 1px solid rgba(239,68,68,0.3);
  background: transparent;
  color: var(--clear);
  border-radius: 8px;
  cursor: pointer;
  transition: var(--transition);
  font-size: 0.85rem;
}

.clear-history:hover {
  background: rgba(239,68,68,0.1);
}

/* Scrollbar */
.history-panel::-webkit-scrollbar {
  width: 6px;
}

.history-panel::-webkit-scrollbar-track {
  background: transparent;
}

.history-panel::-webkit-scrollbar-thumb {
  background: var(--btn-bg);
  border-radius: 3px;
}

/* Responsive */
@media (max-width: 400px) {
  .calculator, .history-panel {
    width: 100%;
    max-width: 340px;
  }
  .calculator-title h1 {
    font-size: 1.75rem;
  }
}
`;

/* ============ CALCULATOR COMPONENT ============ */

const Calculator = () => {
  const [current, setCurrent] = useState('0');
  const [previous, setPrevious] = useState('');
  const [operation, setOperation] = useState(null);
  const [history, setHistory] = useState([]);

  const clear = () => {
    setCurrent('0');
    setPrevious('');
    setOperation(null);
  };

  const deleteLast = () => {
    if (current === '0') return;
    if (current.length === 1) {
      setCurrent('0');
    } else {
      setCurrent(current.slice(0, -1));
    }
  };

  const appendNumber = (number) => {
    if (number === '.' && current.includes('.')) return;
    if (current === '0' && number !== '.') {
      setCurrent(number);
    } else {
      setCurrent(current + number);
    }
  };

  const chooseOperation = (op) => {
    if (current === '') return;
    if (previous !== '') {
      compute();
    }
    setOperation(op);
    setPrevious(current);
    setCurrent('0');
  };

  const compute = () => {
    let computation;
    const prev = parseFloat(previous);
    const curr = parseFloat(current);
    if (isNaN(prev) || isNaN(curr)) return;

    switch (operation) {
      case '+':
        computation = prev + curr;
        break;
      case '-':
        computation = prev - curr;
        break;
      case '×':
        computation = prev * curr;
        break;
      case '÷':
        if (curr === 0) {
          setCurrent('Error');
          setPrevious('');
          setOperation(null);
          return;
        }
        computation = prev / curr;
        break;
      case '%':
        computation = prev % curr;
        break;
      default:
        return;
    }

    const result = parseFloat(computation.toFixed(8)).toString();
    
    // Add to history
    const historyItem = {
      expression: `${prev} ${operation} ${curr}`,
      result: result
    };
    setHistory(prevHistory => [historyItem, ...prevHistory].slice(0, 10));

    setCurrent(result);
    setPrevious('');
    setOperation(null);
  };

  const handlePercent = () => {
    const value = parseFloat(current);
    setCurrent((value / 100).toString());
  };

  const handleToggleSign = () => {
    const value = parseFloat(current);
    setCurrent((value * -1).toString());
  };

  const formatDisplay = (num) => {
    if (num === 'Error') return num;
    const n = parseFloat(num);
    if (isNaN(n)) return num;
    return n.toLocaleString('en-US', { maximumFractionDigits: 8 });
  };

  const buttons = [
    { label: 'AC', class: 'clear span-2', action: clear },
    { label: '⌫', class: 'clear', action: deleteLast },
    { label: '÷', class: 'operator', action: () => chooseOperation('÷') },
    { label: '7', action: () => appendNumber('7') },
    { label: '8', action: () => appendNumber('8') },
    { label: '9', action: () => appendNumber('9') },
    { label: '×', class: 'operator', action: () => chooseOperation('×') },
    { label: '4', action: () => appendNumber('4') },
    { label: '5', action: () => appendNumber('5') },
    { label: '6', action: () => appendNumber('6') },
    { label: '-', class: 'operator', action: () => chooseOperation('-') },
    { label: '1', action: () => appendNumber('1') },
    { label: '2', action: () => appendNumber('2') },
    { label: '3', action: () => appendNumber('3') },
    { label: '+', class: 'operator', action: () => chooseOperation('+') },
    { label: '0', class: 'zero', action: () => appendNumber('0') },
    { label: '.', action: () => appendNumber('.') },
    { label: '=', class: 'equals', action: compute },
  ];

  return (
    <>
      <style>{styles}</style>
      <div className="calculator-wrapper">
        <div className="calculator-title">
          <h1><i className="fas fa-calculator"></i> React Calc</h1>
          <p>Simple & Powerful Calculator</p>
        </div>

        <div className="calculator">
          <div className="display">
            <div className="previous">
              {previous} {operation || ''}
            </div>
            <div className="current">{formatDisplay(current)}</div>
          </div>

          <div className="buttons">
            {buttons.map((btn, index) => (
              <button
                key={index}
                className={`btn ${btn.class || ''}`}
                onClick={btn.action}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {history.length > 0 && (
          <div className="history-panel">
            <h3><i className="fas fa-history"></i> Recent Calculations</h3>
            {history.map((item, index) => (
              <div key={index} className="history-item">
                <span>{item.expression} =</span>
                <span className="result">{item.result}</span>
              </div>
            ))}
            <button className="clear-history" onClick={() => setHistory([])}>
              <i className="fas fa-trash"></i> Clear History
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Calculator;