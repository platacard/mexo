import {useState} from 'react';
import styles from './app.module.scss';
import star from './star.svg';

export function App() {
  const [count, setCount] = useState(0);
  return (
    <div className={styles.container}>
      <h3 className={styles.header}>
        Remote react app <img src={star} alt="star" />{' '}
      </h3>
      <button onClick={() => setCount(count + 1)}>Counter: {count}</button>
    </div>
  );
}

export default App;
