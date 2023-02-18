import BTCard from "react-bootstrap/card";

function Card({ header, title, body, image, minHeight, width = "16rem" }) {
  return (
    <BTCard bg="success" text="white" style={{ width, minHeight }}>
      {header && (
        <BTCard.Header style={{ padding: "10px" }}>{header}</BTCard.Header>
      )}
      {title && (
        <BTCard.Title style={{ padding: "10px" }}>{title}</BTCard.Title>
      )}
      <div style={{ padding: "10px" }}>{body}</div>
      {image && (
        <BTCard.Img
          src={image}
          style={{ width: "200px", margin: "0 auto 20px auto" }}
        />
      )}
    </BTCard>
  );
}

export default Card;
