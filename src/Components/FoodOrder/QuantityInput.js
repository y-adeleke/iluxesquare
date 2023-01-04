import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";

const QuantityInput = (prop) => {
  const [qtyValue, setQtyValue] = useState(1);

  useEffect(() => {
    prop.value(qtyValue);
  }, [qtyValue, prop]);

  useEffect(() => {
    if (prop.orderCompleted === true) setQtyValue(1);
  }, [prop.orderCompleted]);

  return (
    <div className="quantity-input">
      <AiOutlineMinus
        className="decrease"
        onClick={() => {
          if (+qtyValue === 1) return;
          setQtyValue(+qtyValue - 1);
          prop.value(qtyValue);
        }}
      />
      <input
        type="text"
        value={qtyValue}
        maxLength="2"
        onChange={(e) => {
          setQtyValue(e.target.value);
          prop.value(qtyValue);
        }}
      />
      <AiOutlinePlus
        className="increase"
        onClick={() => {
          if (+qtyValue === 99) return;
          setQtyValue(+qtyValue + 1);
          prop.value(qtyValue);
        }}
      />
    </div>
  );
};
export default QuantityInput;
