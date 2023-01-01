const ProductsHelper = (props) => {
  return (
    <div className="product-reveal-con">
      <div className="product-text-box">
        <h1 className="product-title-text">{props.title}</h1>
        <p className="product-info-text">{props.infoContent}</p>
        <button onClick={props.onClick} className="product-action-btn">
          {props.btnText}
        </button>
      </div>
    </div>
  );
};

export default ProductsHelper;
