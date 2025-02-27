export default function MainBtn({ text, onClick, icon: Icon }) {
  return (
    <div>
      <button className="CartBtn" onClick={onClick}>
        <span className="IconContainer">
          <icon className="text-white text-lg me-2" />
          {Icon && <Icon className="pwish text-white text-lg me-2" />}
        </span>
        <p className="text">{text}</p>
      </button>
    </div>
  );
}
