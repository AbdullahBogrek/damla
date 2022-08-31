import { useState, createContext, useContext, useEffect } from "react"

const FavoriteContext = createContext()

const defaultFavorite = JSON.parse(localStorage.getItem("favorite")) || []

const FavoriteProvider = ({children}) => {
    const [items, setItems] = useState(defaultFavorite)

    useEffect(() => {
        localStorage.setItem("favorite", JSON.stringify(items))
    }, [items])

    const addFavorite = (data, findFavoriteItem) => {
        if (!findFavoriteItem) {
            return setItems((items) => [data, ...items ])
        }

        const filtered = items.filter((item) => item._id !== findFavoriteItem._id)

        setItems(filtered)
    }

    const removeFavorite = (item_id) => {
        const filtered = items.filter((item) => item._id !== item_id)
        setItems(filtered)
    }

    const values = {
        items,
        setItems,
        addFavorite,
        removeFavorite,
    }

    return (
        <FavoriteContext.Provider value={values}>{children}</FavoriteContext.Provider>
    )
}

const useFavorite = () => useContext(FavoriteContext)

export { FavoriteProvider, useFavorite }

