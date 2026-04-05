function Card({ label, value, id }) {
  return (
    <div className="card">
      <div className="label">{label}</div>
      <div className="value" id={id}>{value}</div>
    </div>
  );
}

export default Card;