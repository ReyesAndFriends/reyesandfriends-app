import styles from './christmasLights.module.css';

function ChristmasLights() {
    return (
        <ul className={styles.lightrope}>
            {Array.from({ length: 42 }).map((_, i) => (
                <li key={i}></li>
            ))}
        </ul>
    );
}

export default ChristmasLights;