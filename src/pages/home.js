import Card from "../components/card/card";
import image from "../assets/images/bank.jpeg";

export function Home() {
  return (
    <div>
      <Card
        image={image}
        header="BadBank"
        title="Welcome to the bank"
        body="At BadBank we take care of all your banking needs."
      />
    </div>
  );
}
