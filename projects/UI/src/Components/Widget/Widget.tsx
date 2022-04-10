import styles from "./Card.module.scss"

interface IWidgetProps {
  title: string
  description: string
}

export const Widget = ({ title, description }: IWidgetProps) => {
  return (
    <div className={styles.widget}>
      <h1 className={styles.widget__title}>{title}</h1>
      <p className={styles.widget__description}>{description}</p>
    </div>
  )
}
