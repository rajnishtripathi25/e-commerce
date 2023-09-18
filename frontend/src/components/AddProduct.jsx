import React, { useState } from 'react'

const AddProduct = () => {

    const [productName, setname] = useState('')
    const [price, setPrice] = useState('')
    const [category, setcategory] = useState('')
    const [company, setcompany] = useState('')

    const handleSubmit = async () => {
        const userId = JSON.parse(localStorage.getItem('user'))._id
        let result = await fetch("http://localhost:5001/add-product", {
            method: "POST",
            body: JSON.stringify({
                userID: userId,
                name: productName,
                Price: price,
                category: category,
                company: company,
            }),
            headers: {
                "content-type": "application/json"
            }
        })
        result = await result.json()
        if (result) {
            setPrice('')
            setcategory('')
            setcompany('')
            setname('')
            alert("Product added successfully")
        }

    }
    return (
        <>
            <div className='mt-5 form bder'>

                <h1 className='my-3'>Add Product</h1>
                <div>
                    <input
                        type="text"
                        placeholder='Enter name of the product'
                        value={productName}
                        onChange={(e) => setname(e.target.value)}
                    />
                </div>
                <div>

                    <input
                        type="text"
                        placeholder='Enter Price of the product'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />

                </div>
                <div>

                    <input
                        type="text"
                        placeholder='Enter category'
                        value={category}
                        onChange={(e) => setcategory(e.target.value)}
                    />
                </div>
                <div>

                    <input
                        type="text"
                        placeholder='Enter Company name'
                        value={company}
                        onChange={(e) => setcompany(e.target.value)}
                    />
                </div>
                <div>

                    <button                        
                        className='btn btn-outline-success'
                        onClick={handleSubmit} >Add Product</button>
                </div>
            </div>
        </>
    )
}


export default AddProduct