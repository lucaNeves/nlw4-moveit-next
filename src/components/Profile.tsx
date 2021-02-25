import styles from '../styles/components/Profile.module.css';

export function Profile(){
    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/lucaNeves.png" alt="foto de perfil"/>
            <div>
                <strong>Luiz Carlos Neves</strong>
                <p>
                    <img src="icons/level.svg" alt="level"/>
                    Level 1
                </p>
            </div>
        </div>
    );
}