import axios from "axios";
import React, { useState } from "react";
import { useCartStore } from "../../store/cartStore";

export default function CheckoutButton() {
  const { paymentUrl } = useCartStore(state => state.paymentUrl);

    

    return (
        <div>
            
            {paymentUrl && <iframe src={paymentUrl} width="100%" height="600"></iframe>}
        </div>
    );
}

