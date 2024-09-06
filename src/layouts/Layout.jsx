import styles from './Layout.module.css'

const Layout = ({ children }) => {
    return (
        <>
            <header className={styles.header}>
                <h1>Crypto App</h1>
                <p><a href="https://github.com/sasan-farhadi">SasanFarhadi</a> | BootCamp</p>
            </header>
            {children}
            <footer className={styles.footer}>
                <p>BootCamp | botostart.ir</p>
            </footer>
        </>
    )
}

export default Layout
