import styles from "./TestComp.module.css";
export default function TestComp(props) {
  return (
    <div className={styles.test}>
      <p>Hi there {props.data}</p>
      <div>{props.children}</div>
    </div>
  );
}
