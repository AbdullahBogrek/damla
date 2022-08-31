import { Link } from 'react-router-dom'

import "./MarkerInfo.css"
import { useFavorite } from "../../contexts/FavoriteContext"

const capitalizeFirstLetter= str => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

function MarkerInfo({ item, isTalep }) {
  const { addFavorite, items } = useFavorite()

  const findFavoriteItem = items.find(
    (favorite_item) => favorite_item._id === item._id
  )

  return (
    <div>
      <div className="marker-info card">
        <div className="card-body">
          <h5 className="card-title"><i className="fa-solid fa-circle-check me-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Doğrulanmış hesap"></i>{capitalizeFirstLetter(item.title)}</h5>
          <p className="card-text info-window-command">{capitalizeFirstLetter(item.description)}</p>
          
          <div className="container">
            <div className="row d-flex justify-content-between align-items-center">
              <div className="col-4 text-start ps-0 ms-0">
                <Link to={`/yardim/${item._id}`} className="btn btn-sm btn-primary" type="button">Detay</Link>
              </div>
              <div className="col-8 text-end pe-0 me-0">
                <button type="button" className="btn btn-sm btn-warning" onClick={() => addFavorite(item, findFavoriteItem)}>
                  {
                    findFavoriteItem ? <><i className="fa-regular fa-star me-1"></i> Yıldızdan çıkar</> : <><i className="fa-solid fa-star me-1"></i> Talebi yıldızla </>
                  }
                </button>
                <i className="fa-solid fa-eye ms-3 me-1"></i> 303
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default MarkerInfo