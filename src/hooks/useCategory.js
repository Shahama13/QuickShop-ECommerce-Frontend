import { useState, useEffect } from "react"
import axios from "axios"

export default function useCategory() {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        getCategories()
    }, [])

    // get cat
    const getCategories = async () => {
        try {
            const { data } = await axios.get('/api/v1/category/get-category')
            setCategories(data?.category)
        } catch (error) {
            console.log(error)
        }
    }

    return categories;
}