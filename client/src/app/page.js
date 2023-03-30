import styles from './page.module.css'
import ImageRecognitionForm from './components/ColorForm/ColorForm'

export default function Home() {
  return (
    <main className={styles.main}>
      <ImageRecognitionForm />
    </main>
  )
}
