import styles from "./Card.module.scss"

interface IWidgetProps {
  name: string
  description: string
}

export const Widget = ({ name, description }: IWidgetProps) => {
  return (
    <div className={styles.widget}>
      <h1 className={styles.widget__name}>{name}</h1>
      <p className={styles.widget__description}>{description}</p>
    </div>
  )
}
