import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const ShopContext = createContext();


const ShopContextProvider = (props) => {

    const currency = '$';
    const delivery_fee = 10

    const backendurl = "http://localhost:4454"

    const [search, setsearch] = useState('')
    const [showsearch, setshowsearch] = useState(false)
    const [cartitems, setcartitems] = useState({})
    const [products, setproduct] = useState([])
    const [token, settoken] = useState('')

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

    const getcartamount = () => {

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

    const getproductdata = async () => {

        try {

            const res = await axios.get(backendurl + '/api/product/list')

            if (res.data.success) {
                setproduct(res.data.products)
            }
            else {
                toast.error(res.data.message)
            }


        } catch (error) {

            console.log(error);
            toast.error(error.message)


        }
    }

    useEffect(() => {
        getproductdata()
    }, [])

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            settoken(localStorage.getItem('token'))
        }
    }, [])


    const value = {
        products, currency, delivery_fee,
        search, setsearch, showsearch, setshowsearch,
        cartitems, setcartitems, addtocart, getcartcount, updateQuantity, getcartamount, navigate, backendurl, settoken, token
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )

}

export default ShopContextProvider