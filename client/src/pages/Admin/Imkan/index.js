import { useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { fetchImkanList, deleteImkan } from "../../../Api";
import { Link } from "react-router-dom";
import { Table, Popconfirm } from "antd"
import "../admin.css"

function Imkan() {
  const queryClient = useQueryClient();

  const { isLoading, isError, data, error } = useQuery('admin:imkans', fetchImkanList)
  
  const deleteMutation = useMutation(deleteImkan, {
    onSuccess: () => queryClient.invalidateQueries('admin:imkans')
  })

  const columns = useMemo(() => {
    return [
      {
        title: "Başlık",
        dataIndex: "title",
        key: "title"
      },
      {
        title: "İl",
        dataIndex: "province",
        key: "province"
      },
      {
        title: "İlçe",
        dataIndex: "district",
        key: "district"
      },
      {
        title: "Tarih",
        dataIndex: "createdAt",
        key: "createdAt"
      },
      {
        title: "Aksiyon",
        key: "Aksiyon",
        render: (text, record) => (
          <>
            <Popconfirm 
              title="Emin misiniz?" 
              onConfirm={() => {
                deleteMutation.mutate(record._id, {
                  onSuccess: () => {
                    console.log("Imkan silindi")
                  }
                })
              }} 
              okText="Sil"
              cancelText="İptal"
              placement="left"
            >
              <button type="button" className="btn btn-sm btn-danger">
                <i className="fa-solid fa-trash-can"></i>
              </button>
            </Popconfirm>
          </>
        )
      },
    ]
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error {error.message}</div>
  }

  return (
    <>
      <div className="container">
        <nav className="admin-header d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-2 my-3 border-bottom shadow p-3 bg-body rounded">
          <ul className="nav col-12 col-md-auto">
              <li>
                  <Link to="/admin" className="nav-link text-primary">
                      <i className="fa-solid fa-gauge me-1 d-none d-sm-inline"></i> Panel
                  </Link>
              </li>
              <li>
                  <Link to="/admin/talepler" className="nav-link text-danger">
                      <i className="fa-solid fa-hand-holding-medical me-1 d-none d-sm-inline"></i> Talepler
                  </Link>
              </li>
              <li>
                  <Link to="/admin/imkanlar" className="nav-link text-success">
                      <i className="fa-solid fa-hand-holding-hand me-1 d-none d-sm-inline"></i> İmkanlar
                  </Link>
              </li>
              <li>
                  <Link to="/admin/kullanici" className="nav-link text-warning">
                      <i className="fa-solid fa-user-group me-1 d-none d-sm-inline"></i> Kullanıcılar
                  </Link>
              </li>
          </ul>
        </nav>
        <section className="mb-2 border-bottom shadow pt-4 px-4 mb-5 bg-body rounded vh-100">
          <div className="py-3 mb-4 border-bottom">
                <div className="container d-flex flex-wrap justify-content-center">
                  <div className="col-4 d-flex align-items-center mb-lg-0 me-lg-auto text-dark">
                    <h4>İmkanlar</h4>
                  </div>
                  <div className="col-2"></div>
                  <form className="col-6" role="search">
                    <input type="search" className="form-control" placeholder="Ara..." aria-label="Search" />
                  </form>
                </div>
          </div>
          <div className="container">
            <Table dataSource={data} columns={columns} rowKey="_id"/>

                {/*<div className="row px-2 d-flex justify-content-between table-responsive">
                     <table className="table table-striped table-sm">
                          <thead>
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">Başlık</th>
                              <th scope="col">İl</th>
                              <th scope="col">İlçe</th>
                              <th scope="col">Tarih</th>
                              <th scope="col">Durum</th>
                              <th scope="col">Aksiyonlar</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              data.map((imkan, key) => (
                                <tr key={imkan._id}>
                                  <td>{key + 1}</td>
                                  <td>{(imkan.title)}</td>
                                  <td>{(imkan.province)}</td>
                                  <td>{(imkan.district)}</td>
                                  <td>{moment(imkan.createdAt).format("DD/MM/YYYY")}</td>
                                  <td>Doğrulanmış</td>
                                  <td>
                                    <input type="checkbox" className="btn-check" id="btn-check-outlined" autoComplete="off" />
                                    <label className="btn btn-sm btn-outline-success my-0" htmlFor="btn-check-outlined" data-bs-toggle="tooltip" data-bs-placement="top" title="Talebi doğrula"><i className="fa-solid fa-circle-check"></i></label>
                                    
                                    <button type="button" className="btn btn-sm my-0 table-delete-btn btn-danger" data-bs-toggle="modal" data-bs-target="#userDeleteModal">
                                        <i className="fa-solid fa-trash-can"></i>
                                    </button>
                                      
                                      <div className="modal fade" id="userDeleteModal" tabIndex="-1" aria-labelledby="userDeleteModalLabel" aria-hidden="true">
                                          <div className="modal-dialog modal-dialog-centered">
                                              <div className="modal-content rounded-3 shadow">
                                                  <div className="modal-body p-4 text-center">
                                                    <h5 className="mb-2">İmkanı silmek istiyor musun?</h5>
                                                    <p className="mb-0">Bu işlem sonucunda oluşturulan yardım imkanı her yerden silinecektir. Silinen talep geri getirilemez. </p>
                                                  </div>
                                                  <div className="modal-footer flex-nowrap p-0">
                                                    <Link 
                                                      to="/admin/kullanici/" 
                                                      className="btn btn-lg btn-link fs-6 modal-delete-btn text-danger text-decoration-none col-6 m-0 rounded-0 border-end"
                                                      onClick={() => {
                                                        deleteMutation.mutate(imkan._id, {
                                                          onSuccess: () => {
                                                            console.log("başarılı")
                                                          }
                                                        })
                                                      }}
                                                    ><strong>Sil</strong></Link>
                                                    <button type="button" className="btn btn-lg btn-link modal-close-btn fs-6 text-dark text-decoration-none col-6 m-0 rounded-0" data-bs-dismiss="modal">Çıkış</button>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  </td>
                                </tr>
                              ))
                            }
                          </tbody>
                    </table>
                    <div className="page d-flex justify-content-end">
                        <nav aria-label="Page navigation example">
                            <ul className="pagination">
                              <li className="page-item">
                                <a className="page-link" href="/#" aria-label="Previous">
                                  <span aria-hidden="true">&laquo;</span>
                                </a>
                              </li>
                              <li className="page-item"><a className="page-link" href="/#">1</a></li>
                              <li className="page-item"><a className="page-link" href="/#">2</a></li>
                              <li className="page-item"><a className="page-link" href="/#">3</a></li>
                              <li className="page-item">
                                <a className="page-link" href="/#" aria-label="Next">
                                  <span aria-hidden="true">&raquo;</span>
                                </a>
                              </li>
                            </ul>
                        </nav>
                    </div> 
                </div>*/}
          </div> 
        </section>
      </div>  
    </>
  )
}

export default Imkan