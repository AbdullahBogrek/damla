import { Link } from "react-router-dom";
import { useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { fetchUserList, deleteUser } from "../../../Api";
import { Table, Popconfirm } from "antd"
import "../admin.css"

function Kullanici() {
  const queryClient = useQueryClient();

  const { isLoading, isError, data, error } = useQuery('admin:users', fetchUserList);

  const columns = useMemo(() => {
    return [
      {
        title: "Ad",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "Soyad",
        dataIndex: "surname",
        key: "surname"
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email"
      },
      {
        title: "Telefon",
        dataIndex: "phone",
        key: "phone"
      },
      {
        title: "Rol",
        dataIndex: "role",
        key: "role"
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
                    console.log("Kullanıcı silindi")
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

  const deleteMutation = useMutation(deleteUser, {
    onSuccess: () => queryClient.invalidateQueries('admin:users')
  })

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
              <div className="col-4 d-flex align-items-center me-lg-auto text-dark">
                <h4>Kullanıcılar</h4>
              </div>
              <div className="col-2"></div>
              <form className="col-6" role="search">
                <input type="search" className="form-control" placeholder="Ara..." aria-label="Search" />
              </form>
            </div>
          </div>
          <div className="container">
            <Table dataSource={data} columns={columns} rowKey="_id"/>
            {/* <div className="row px-2 d-flex justify-content-between table-responsive">
                <table className="table table-striped table-sm">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">İsim</th>
                          <th scope="col">Soyisim</th>
                          <th scope="col">Email</th>
                          <th scope="col">Telefon</th>
                          <th scope="col">Rol</th>
                          <th scope="col">Aksiyon</th>
                        </tr>
                      </thead>
                      <tbody>
                          {
                            data.map((user, key) => (
                              
                              <tr key={key}>
                                <td>{key + 1}</td>
                                <td>{capitalizeFirstWords(user.name)}</td>
                                <td>{capitalizeFirstWords(user.surname)}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{capitalizeFirstWords(user.role)}</td>
                                
                                <td> */}
                                    {/* <button type="button" className="btn btn-sm me-1 btn-warning" data-bs-toggle="modal" data-bs-target="#userUpdateModal">
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </button>
                                    
                                    <div className="modal fade" id="userUpdateModal" tabIndex="-1" aria-labelledby="userUpdateModalLabel" aria-hidden="true">
                                        <div className="modal-dialog modal-dialog-centered">
                                            <div className="modal-content rounded-3 shadow">
                                                <div className="modal-body p-4 text-center">
                                                    <h5 className="mb-4">Kullanıcıyı Güncelle</h5>
                                                    <form className="POST">
                                                        <div className="form-floating mb-3">
                                                            <select className="form-select" id="floatingSelectGender">
                                                                <option defaultValue>Rol seçiniz</option>
                                                                <option value="admin">Admin</option>
                                                                <option value="user">User</option>
                                                            </select>
                                                            <label htmlFor="floatingSelectGender">Kullanıcı Rolü</label>
                                                        </div>
                                                        <div className="form-floating mb-3">
                                                            <select className="form-select" id="floatingSelectGender">
                                                                <option defaultValue>Lütfen hesap durumunu seçiniz.</option>
                                                                <option value="aktif">Aktif</option>
                                                                <option value="pasif">Pasif</option>
                                                            </select>
                                                            <label htmlFor="floatingSelectGender">Hesap Durumu</label>
                                                        </div>
                                                    </form>
                                                </div>
                                                <div className="modal-footer flex-nowrap p-0">
                                                  <button type="button" className="btn btn-lg btn-link fs-6 modal-save-btn text-success text-decoration-none col-6 m-0 rounded-0 border-end"><strong>Kaydet</strong></button>
                                                  <button type="button" className="btn btn-lg btn-link modal-close-btn fs-6 text-dark text-decoration-none col-6 m-0 rounded-0" data-bs-dismiss="modal">Çıkış</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                    
                                    {/* <button type="button" className="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target="#userDeleteModal">
                                        <i className="fa-solid fa-trash-can"></i>
                                    </button>
                                    
                                    <div className="modal fade" id="userDeleteModal" tabIndex="-1" aria-labelledby="userDeleteModalLabel" aria-hidden="true">
                                        <div className="modal-dialog modal-dialog-centered">
                                            <div className="modal-content rounded-3 shadow">
                                                <div className="modal-body p-4 text-center">
                                                  <h5 className="mb-2">Bu kullanıcıyı silmek istiyor musun?</h5>
                                                  <p className="mb-0">Bu işlem sonucunda bu kullanıcıya ait bütün talepler ve imkanlar tamamen silinecektir. </p>
                                                </div>
                                                <div className="modal-footer flex-nowrap p-0">
                                                  <Link
                                                    to="/admin/kullanici" 
                                                    className="btn btn-lg btn-link fs-6 modal-delete-btn text-danger text-decoration-none col-6 m-0 rounded-0 border-end"
                                                    onClick={() => {
                                                      deleteMutation.mutate(user._id, {
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
            </div>*/}
          </div>
        </section>
      </div> 
    </> 
  )
}

export default Kullanici