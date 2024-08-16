import styles from "./bubble.module.css";

const Example = ({ name }) => {
  return (
    <div>
      <BubbleText name={name} />
    </div>
  );
};

const BubbleText = ({ name }) => {
  return (
    <h2 className="mt-3.5 mb-3.5 text-center text-5xl font-thin text-black">
      {name.split("").map((child, idx) => (
        <span className={styles.hoverText} key={idx}>
          {child}
        </span>
      ))}
    </h2>
  );
};

export default Example;
