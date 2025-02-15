import React, { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();


const ShopContextProvider = (props) => {

    const currency = '$';
    const delivery_fee = 10

    const [search, setsearch] = useState('')
    const [showsearch, setshowsearch] = useState(false)
    const [cartitems, setcartitems] = useState({})

    const navigate = useNavigate()

    const addtocart = async (itemId, size) => {

        if (!size) {
            toast.error('Select Product Size !!')
            return
        }

        let cartdata = structuredClone(cartitems)

        if (cartdata[itemId]) {
            if (cartdata[itemId][size]) {
                cartdata[itemId][size] += 1
            }

            else {
                cartdata[itemId][size] = 1
            }
        }

        else {
            cartdata[itemId] = {}
            cartdata[itemId][size] = 1
        }

        setcartitems(cartdata)
        toast.success('Product added to Cart')

    }

    const getcartcount = () => {
        let totalcount = 0

        for (const items in cartitems) {
            for (const item in cartitems[items]) {
                try {
                    if (cartitems[items][item] > 0) {
                        totalcount += cartitems[items][item]
                    }
                } catch (error) {
                    console.log(error);

                }
            }
        }

        return totalcount;

    }

    const updateQuantity = async (itemId, size, quantity) => {

        let cartdata = structuredClone(cartitems)

        cartdata[itemId][size] = quantity

        setcartitems(cartdata)
    }

    const getcartamount =  () => {

        let totalcount = 0

        for (const items in cartitems) {
            let iteminfo = products.find((product) => product._id === items)
            for (const item in cartitems[items]) {
                try {

                    if (cartitems[items][item] > 0) {
                        totalcount += iteminfo.price * cartitems[items][item]
                    }

                } catch (error) {

                }
            }

        }

        return totalcount

    }


    const value = {
        products, currency, delivery_fee,
        search, setsearch, showsearch, setshowsearch,
        cartitems, addtocart, getcartcount, updateQuantity, getcartamount , navigate
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )

}

export default ShopContextProvider